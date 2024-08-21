import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { estatusCitas, getMonthNumber, tiposCitasConst } from '../../helpers/helpers';
import { Observable, map, startWith } from 'rxjs';
import { HelpersService } from 'src/app/services/helpers.services';
import { inscripcionControllerService } from 'src/app/pages/inscripciones/controller/inscripcion.controller';
import { FichaService } from 'src/app/pages/ficha-admision/services/ficha.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { C } from '@angular/cdk/keycodes';
import { CorreosRequest,responseDatos } from 'src/app/interfaces/correos';
import { environment } from 'src/environments/environment';
import { NotificacionesService } from 'src/app/services/notificaciones.services';
import { NotificacionesInsert } from 'src/app/interfaces/notificaciones';
import { helperControllerService } from '../../helpers/helper.controller';
import { Citas } from 'src/app/pages/citas/interfaces/citas';
import { User } from 'src/app/interfaces/user';
import { Cita } from '../cita-dialog/cita-dialog.component';


export interface DialogData {
  cita : Citas;
  usuario: User;
}




@Component({
  selector: 'app-cita-dialog',
  templateUrl: './cita-dialog.component.html',
  styleUrls: ['./cita-dialog.component.scss']
})

export class CitaDialogComponentAutorizar implements OnInit {
  public titulo: string = 'Autorizar Cita';
  public isLoading: boolean = false;
  public cita: Citas = this.data.cita;
  private lstFiles: any[] = [];
  public lstDepartamentos : any[] = [];
  public lstPlanteles : any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CitaDialogComponentAutorizar>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private fb : FormBuilder,
    private helpersService: HelpersService,
    private inscripcionesService: inscripcionControllerService,
    private fichaService : FichaService,
    private snackBar: MatSnackBar,
    private sharedService: NotificacionesService,
    private helperController: helperControllerService
    

  ) {}


  public formCita: any = this.fb.group({
    chrResultados : ['', Validators.required],
    chrAnexo : ['', Validators.required],
    chrObservaciones : ['', Validators.required],
    dtFecha : ['', Validators.required],
    chrEstatus : ['', Validators.required],
    dtEntrada : ['', [Validators.required, Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')]],
     
  });




  ngOnInit(): void {
    this.getDepartamentos();
    this.getPlanteles();
    if(this.cita.chrEstatus == 'pendiente'){

      this.formCita.get('chrResultados')?.disable();
      this.formCita.get('chrAnexo')?.disable();
       let fechaSplit = this.cita.dtFecha.split(' ');
        let dia = parseInt(fechaSplit[0]) + 1;
        let mes = fechaSplit[2];
        let anio = fechaSplit[4];
        let mesNumero = getMonthNumber(mes.toLowerCase());
        let fecha = `${anio}-${mesNumero}-${dia}`;
        this.formCita.get('dtFecha')?.setValue(fecha);
      
    } else {
      this.formCita.get('dtFecha')?.disable();
      this.formCita.get('chrEstatus')?.disable();
      this.formCita.get('chrEstatus')?.setValue('finalizada');
      let fechaSplit = this.cita.dtFecha.split(' ');
        let dia = parseInt(fechaSplit[0]) + 1;
        let mes = fechaSplit[2];
        let anio = fechaSplit[4];
        let mesNumero = getMonthNumber(mes.toLowerCase());
        let fecha = `${anio}-${mesNumero}-${dia}`;
        this.formCita.get('dtFecha')?.setValue(fecha);
    }
  }

    //obtener departamentos
    async getDepartamentos(): Promise<void> {
      this.helpersService.getDepartamentos('1').subscribe({
         next: (data: any) => {
           this.lstDepartamentos = data.data;
         },
         error: (error) => {
           this.lstDepartamentos = [];
         }
       });
     }

     private async getPlanteles(): Promise<void> {
      this.lstPlanteles = await this.inscripcionesService.getEscuelas();
    }

  onSave(){

   let citaData : Cita = {
    chrClave: this.cita.chrClave,
    chrClaveUsuario: this.cita.chrClaveUsuario,
    dtFecha: this.formCita.get('dtFecha').value ?? this.cita.dtFecha,
    chrObservaciones: this.cita.chrObservaciones + '\n' + this.formCita.get('chrObservaciones').value,
    chrClaveDepartamento: this.cita.chrClaveDepartamento,
    chrClaveUsuarioCitado: this.cita.chrClaveUsuarioCitado,
    chrEstatus: this.formCita.get('chrEstatus').value ?? this.cita.chrEstatus,
    chrPlantel: this.cita.chrPlantel,
    dtEntrada: this.formCita.get('dtEntrada').value ?? this.cita.dtEntrada,
    dtSalida: this.cita.dtSalida,
    intMonto: this.cita.intMonto,
    chrNombrePaciente: this.cita.chrNombrePaciente,
    chrNombreTerapeuta: this.cita.chrNombreTerapeuta,
    intEdad: this.cita.intEdad,
    tipoCita: this.cita.tipoCita,
    chrResultados: this.formCita.get('chrResultados').value,
    chrAnexo: this.formCita.get('chrAnexo').value,
    chrProceso: this.formCita.get('chrEstatus').value === 'finalizada' ? 75 : this.formCita.get('chrEstatus').value === 'aceptada' ? 50 : 25

  }
  let base64Anexo = "";
  /*convertir a base64 el archivo */
  if (this.lstFiles.length  !== 0) {
    base64Anexo = this.lstFiles.find(file => file.controlName === 'chrAnexo').file || '';
  }
  citaData.chrAnexo = base64Anexo;

  this.fichaService.actualizarCita(citaData).subscribe({
    next: (data: any) => {
     this.openSnackBar('Cita actualizada correctamente', '👌🙌');
     //si el estatus es finalizada, enviar notificacion
     let responseDatos : responseDatos = {
      chrNombre:  this.data.cita.chrNombrePaciente.split(' ')[0],
      chrPaterno:  this.data.cita.chrNombrePaciente.split(' ')[1],
      chrMaterno:  this.data.cita.chrNombrePaciente.split(' ')[2]
    };

      if(citaData.chrEstatus === 'finalizada'){

      
        let dataCorreo : CorreosRequest = {
         
          data: {
            correo:  this.data.cita.chrCorreoElectronico,
            asunto: 'Resultado de cita agendada',
            body: `<p>Querido ${this.data.usuario.chrNombre}, hacemos de su conocimiento que los resultados de la cita agendada para el día ${citaData.dtFecha} con el departamento de han sido los siguientes: ${citaData.chrResultados}</p> <p>Para más información, por favor ingrese a la plataforma</p>`,
            response: responseDatos,
            textButton: 'Ir a la plataforma',
            url : `${environment.URL_SITE}`
          }
        };
    
        let notificacion : NotificacionesInsert = {
          chrClaveDestino: '1', //cambiar por la de vinculación
          chrTipo: "3",
          chrMensaje: `Los resultados de : ${this.data.cita.chrNombrePaciente} han sido  ${citaData.chrResultados}`,
          chrStatus: 1,
          chrUrl: '/aspirante/aspirante',
          chrTitulo: 'Resultado de cita'
        };


        this.helperController.insertNotification(notificacion);
        this.openSnackBar('Cita creada con exito', '👌🙌')
        this.dialogRef.close();

        this.sharedService.sendCorreoElectronico(dataCorreo).subscribe({
          next: (res) => {
            this.isLoading = false;
            //reset form
          
        
          }
        });
      } else if (citaData.chrEstatus === 'aceptada'){

        let dataCorreo : CorreosRequest = {
          data: {
            correo:  this.data.cita.chrCorreoElectronico,
            asunto: 'Cita agendada',
            body: `<p>Se ha agendado una cita para el dia ${citaData.dtFecha} con el departamento de ${this.cita.chrClaveDepartamento} en el plantel ${citaData.chrPlantel}</p> <p>Para más información, por favor ingrese a la plataforma</p>`,
            response: responseDatos,
            textButton: 'Ver cita',
            url : `${environment.URL_SITE}`
          }
        };


        let notificacion : NotificacionesInsert = {
          chrClaveDestino: '1', //cambiar por la de vinculación
          chrTipo: "3",
          chrMensaje: `La cita de ${this.data.cita.chrNombrePaciente} ha sido aceptada`,
          chrStatus: 1,
          chrUrl: '/aspirante/aspirante',
          chrTitulo: 'Cita aceptada'
        };

        this.helperController.insertNotification(notificacion);
        this.sharedService.sendCorreoElectronico(dataCorreo).subscribe({ next: (res) => { this.isLoading = false; } });

        this.openSnackBar('Cita creada con exito', '👌🙌')
        this.dialogRef.close();
      }

      this.dialogRef.close(true);
    },
    error: (error) => {
      this.openSnackBar('Ocurrió un error al actualizar la cita', '😣🤐');
      this.dialogRef.close(false);
    }
  });

  }

  onCancel(){
    this.dialogRef.close();
  }


  public onFileSelected(event: any, controlName: string) {
    //quitar si ya hay un archivo
    this.lstFiles = this.lstFiles.filter(file => file.controlName !== controlName);
    
    const file: File = event.target.files[0];
    //convertir el archivo a base64
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64 = reader.result;
        this.lstFiles.push({file: base64, controlName: controlName});
        //poner el nombre del archivo en el input
        this.formCita.get(controlName)?.setValue(file.name);
      }
  }

  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy'; 
    }
  }

 public  onDrop(event: DragEvent, controlName: string) {
    this.lstFiles = this.lstFiles.filter(file => file.controlName !== controlName);
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        let base64 = reader.result;
        this.lstFiles.push({file: base64, controlName: controlName});
        this.formCita.get(controlName)?.setValue(files[0].name);
      }
    }
  }

  private openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

}