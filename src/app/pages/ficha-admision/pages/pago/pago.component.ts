import { Component, OnInit } from '@angular/core';
import { Ficha, FichaConsultarResponse } from '../../interfaces/ficha';
import { ComprobantePagoComponent } from '../../../../shared/reports/pdf-comprobantePago';
import { FichaControllerService } from '../../controller/ficha.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  public datosFicha: FichaConsultarResponse = {} as FichaConsultarResponse;
  private referencia: string = '';
  constructor(
    private fichaController: FichaControllerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getDataByUrl();
    this.consultarFicha();
  }

  public async getDataByUrl (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.activatedRoute.params.subscribe(params => {
        this.referencia = params['referencia'];
        resolve();
      });
    });
  }


  private consultarFicha(): void {
    this.fichaController.consultarFicha(this.referencia).then((data) => {
        this.datosFicha = data;
    }, (error) => {
      window.location.href = '/ficha-admision';
    }
    );
  }

  public generarComprobantePago(): void {
    ComprobantePagoComponent();
  }

  //pagar en linea
  public pagarEnLinea(): void {
    //generamos el folio de pago 
    let claveAlumno = this.datosFicha.data.datosFicha.chrClave;
    this.fichaController.crearFolioMultipagos(claveAlumno).then((data) => {
      if (data) {
        //ahora generamos la firma
        let folio = data.folio;
        let referencia = this.datosFicha.data.datosRerencia.chrLineaReferencia2;
        let monto = this.datosFicha.data.datosRerencia.intMonto;
        let concepto = "2";
        this.fichaController.crearFirmaFolio(folio, referencia, monto, concepto).then((data) => {
          let hash = data.firma;

          let formData = new FormData();
          formData.append('cl_folio', folio);
          formData.append('cl_referencia', referencia);
          formData.append('dl_monto', monto.toString());
          formData.append('cl_concepto', concepto);
          formData.append('servicio', "107");
          formData.append('hash', hash);

          //enviar el formulario
          let form = document.createElement('form');
          form.setAttribute('method', 'post');
          form.setAttribute('action', 'https://multipagos.bb.com.mx/Estandar/index2.php');
          form.setAttribute('target', 'popup');
          form.setAttribute('onsubmit', "window.open('','popup','width=870,height=600,menubar=no, scrollbars=yes,directories=no')");
          //agregar los campos
          let inputFolio = document.createElement('input');
          inputFolio.setAttribute('type', 'text');
          inputFolio.setAttribute('name', 'cl_folio');
          inputFolio.setAttribute('id', 'cl_folio');
          inputFolio.setAttribute('value', folio);
          inputFolio.setAttribute('readonly', 'true');
          form.appendChild(inputFolio);

          let inputReferencia = document.createElement('input');
          inputReferencia.setAttribute('type', 'text');
          inputReferencia.setAttribute('name', 'cl_referencia');
          inputReferencia.setAttribute('id', 'cl_referencia');
          inputReferencia.setAttribute('value', referencia);
          inputReferencia.setAttribute('readonly', 'true');
          form.appendChild(inputReferencia);

          let inputMonto = document.createElement('input');
          inputMonto.setAttribute('type', 'text');
          inputMonto.setAttribute('name', 'dl_monto');
          inputMonto.setAttribute('id', 'dl_monto');
          inputMonto.setAttribute('value', monto.toString());
          inputMonto.setAttribute('readonly', 'true');
          form.appendChild(inputMonto);

          let inputConcepto = document.createElement('input');
          inputConcepto.setAttribute('type', 'text');
          inputConcepto.setAttribute('name', 'cl_concepto');
          inputConcepto.setAttribute('id', 'cl_concepto');
          inputConcepto.setAttribute('value', concepto);
          inputConcepto.setAttribute('readonly', 'true');
          form.appendChild(inputConcepto);

          let inputServicio = document.createElement('input');
          inputServicio.setAttribute('type', 'text');
          inputServicio.setAttribute('name', 'servicio');
          inputServicio.setAttribute('id', 'servicio');
          inputServicio.setAttribute('value', '107');
          inputServicio.setAttribute('readonly', 'true');
          form.appendChild(inputServicio);

          let inputHash = document.createElement('input');
          inputHash.setAttribute('type', 'hidden');
          inputHash.setAttribute('name', 'hash');
          inputHash.setAttribute('id', 'hash');
          inputHash.setAttribute('value', hash);
          form.appendChild(inputHash);

          //enviar el formulario
          document.body.appendChild(form);
          form.submit();
          //eliminar el formulario
          document.body.removeChild(form);
          

        }
        );
      }
    }
    );
  }


  private openSnackBar(message: string, icon: string): void {
    this.snackBar.open(message, icon, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }


}
