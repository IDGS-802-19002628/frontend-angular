import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FichaControllerService } from '../../controller/ficha.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sexo } from 'src/app/pages/alumno/interfaces/sexo.interface';
import { comoConocioConst, horariosConst, licenciaturasConst, sexosConst } from 'src/app/shared/helpers/helpers';
import { Licenciatura } from '../../interfaces/licenciaturas';
import { Horario } from '../../interfaces/horario';
import { comoConociste } from '../../interfaces/como-conociste';
import { EmailVerificationComponent } from 'src/app/shared/dialogs/email-verification/email-verification.component';
import { MatDialog } from '@angular/material/dialog';
import { Ficha, FichaRequest } from '../../interfaces/ficha';
import { Correos, CorreosRequest,responseDatos } from 'src/app/interfaces/correos';
import { NotificacionesService } from 'src/app/services/notificaciones.services';
import { Planteles } from 'src/app/pages/alumno/interfaces/planteles.interfaces';
import { inscripcionControllerService } from 'src/app/pages/inscripciones/controller/inscripcion.controller';
import { NotificacionesInsert } from 'src/app/interfaces/notificaciones';
import { helperControllerService } from 'src/app/shared/helpers/helper.controller';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  public isLoading: boolean = false;
  public sexos: Sexo[] = sexosConst;
  public licenciaturas: Licenciatura[] = licenciaturasConst;
  public horarios: Horario[] = horariosConst;
  public medios: comoConociste[] = comoConocioConst;
  public lstPlanteles: Planteles[] = [];
  constructor(

    private fb : FormBuilder,
    private fichaController: FichaControllerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sharedService: NotificacionesService,
    private inscripcionesService: inscripcionControllerService,
    private helperController: helperControllerService

  ) { }

  //Formulario de ficha de admisión
 public formularioFicha = this.fb.group({
    chrClave: [''],
    chrCorreoElectronico: ['',[Validators.required, Validators.email]],
    chrNombre : ['',Validators.required],
    chrApellidoPaterno: ['',Validators.required],
    chrApellidoMaterno: ['',Validators.required],
    chrGenero: ['',Validators.required],
    chrNumeroTelefono: ['',Validators.required],
    dtFechaNacimiento: ['',Validators.required],
    chrDireccion: ['',Validators.required],
    chrCiudadResidencia: ['',Validators.required],
    chrPreparatoriaEgreso: ['',Validators.required],
    chrLicenciaturaInteres: ['',Validators.required],
    chrHorarioInteres: ['',Validators.required],
    chrComoConocio: ['',Validators.required],
    chrEstatus: [''],
    chrClavePlantel: ['',Validators.required]
  });


  ngOnInit(): void {
    this.getPlanteles();
  }

  private async getPlanteles(): Promise<void> {
    this.lstPlanteles = await this.inscripcionesService.getEscuelas();
  }

  public openEmailVerificationDialog(): void {
    const dialogRef = this.dialog.open(EmailVerificationComponent, {
      width: '500px',
      data: {
        email: this.formularioFicha.get('chrCorreoElectronico')?.value,
        code: '',
        length: 6,
        nombre: this.formularioFicha.get('chrNombre')?.value,
        apellidoPaterno: this.formularioFicha.get('chrApellidoPaterno')?.value,
        apellidoMaterno: this.formularioFicha.get('chrApellidoMaterno')?.value,
      },
    });

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {

        let data : FichaRequest = {
          data: {
            chrClave: this.formularioFicha.get('chrClave')?.value ?? '',
          chrCorreoElectronico: this.formularioFicha.get('chrCorreoElectronico')?.value ?? '',
          chrNombre: this.formularioFicha.get('chrNombre')?.value ?? '',
          chrApellidoPaterno: this.formularioFicha.get('chrApellidoPaterno')?.value ?? '',
          chrApellidoMaterno: this.formularioFicha.get('chrApellidoMaterno')?.value ?? '',
          chrGenero: this.formularioFicha.get('chrGenero')?.value ?? '',
          chrNumeroTelefono: this.formularioFicha.get('chrNumeroTelefono')?.value ?? '',
          dtFechaNacimiento: this.formularioFicha.get('dtFechaNacimiento')?.value ?? '',
          chrDireccion: this.formularioFicha.get('chrDireccion')?.value ?? '',
          chrCiudadResidencia: this.formularioFicha.get('chrCiudadResidencia')?.value ?? '',
          chrPreparatoriaEgreso: this.formularioFicha.get('chrPreparatoriaEgreso')?.value ?? '',
          chrLicenciaturaInteres: this.formularioFicha.get('chrLicenciaturaInteres')?.value ?? '',
          chrHorarioInteres: this.formularioFicha.get('chrHorarioInteres')?.value ?? '',
          chrComoConocio: this.formularioFicha.get('chrComoConocio')?.value ?? '',
          chrEstatus: this.formularioFicha.get('chrEstatus')?.value ?? '',
          chrClavePlantel: this.formularioFicha.get('chrClavePlantel')?.value ?? ''
        }
      }

        this.isLoading = true;
        if(result){
          let response = await this.fichaController.guardarFicha(data);
          //mandamos correo si todo salio bien

          if(response){

            let responseDatos : responseDatos = {
              chrNombre: this.formularioFicha.get('chrNombre')?.value ?? '',
              chrPaterno:  this.formularioFicha.get('chrApellidoPaterno')?.value ?? '',
              chrMaterno:  this.formularioFicha.get('chrApellidoMaterno')?.value ?? ''
            };
 
            let data : CorreosRequest = {
              data: {
                correo: this.formularioFicha.get('chrCorreoElectronico')?.value ?? '',
                asunto: 'Pago de ficha de admisión',
                body: `<p>
                Gracias por su interés en nuestra institución, a continuación le proporcionamos la información necesaria para realizar el pago de tu ficha de admisión.
                <br>
                <br>
                <strong>Referencia:</strong> ${response.data.referencia}
                <br>
                <strong>Monto:</strong> ${response.data.monto}
                <br>
                <strong>Fecha de vencimiento:</strong> ${response.data.fechaVencimiento}
                <br>
                <strong>Servicio:</strong> ${response.data.servicio}
                <br>
                <strong>Banco:</strong> ${response.data.banco}
                <br>
                <br>
                <strong>Pago en cualquier sucursal del país.</strong>
                <br>
                <br>
                <strong>EXIJA SU COMPROBANTE DE PAGO; SE LO DEBE EMITIR EL CAJERO DE BANCO,HECHO EL PAGO NO HABRA DEVOLUCION EN NINGUN CASO.</strong>
                <br>
                </p>`,
                response: responseDatos,
                textButton: 'Pagar en línea',
                url : `http://localhost:4200/ficha-admision/pago/${response.data.referencia}`
              }
            };
        
            
            this.sharedService.sendCorreoElectronico(data).subscribe({
              next: (res) => {
                this.isLoading = false;
                //reset form
                let notificacion : NotificacionesInsert = {
                  chrClaveDestino: '3', //cambiar por la de vinculación
                  chrTipo: "3",
                  chrMensaje: 'Se ha registrado un nuevo aspirante',
                  chrStatus: 1,
                  chrUrl: '/aspirante/aspirante',
                  chrTitulo: 'Nuevo aspirante',
                };
        
        
                this.helperController.insertNotification(notificacion);
                this.formularioFicha.reset();
                this.openSnackBar('Ficha guardada correctamente', '🤟🤩');
              },
              error: (err) => {
                this.isLoading = false;
                //reset form
                this.formularioFicha.reset();
                this.openSnackBar('Error al enviar correo', '🤯😈');
              }
            });
            
          }
        }
        this.isLoading = false;
       // window.location.reload();
      }
    });
  }


  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}

