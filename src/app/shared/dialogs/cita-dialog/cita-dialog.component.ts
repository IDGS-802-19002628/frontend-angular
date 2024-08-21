import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { estatusCitas, tiposCitasConst } from '../../helpers/helpers';
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


export interface DialogData {
  nombre: string;
  tipoCita: string;
  usuario: string;
  correo: string;
}

export interface Cita {
  chrClave: string;
  chrClaveUsuario: string;
  dtFecha: string;
  chrObservaciones: string;
  chrClaveDepartamento: string;
  chrClaveUsuarioCitado: string;
  chrEstatus: string;
  chrPlantel: string;
  dtEntrada: string;
  dtSalida: string;
  intMonto: number;
  chrNombrePaciente: string;
  chrNombreTerapeuta: string;
  intEdad: number;
  tipoCita: string;
  chrAnexo?: string;
  chrResultados?: string;
  chrProceso?: number;
}


export interface lstCitas {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-cita-dialog',
  templateUrl: './cita-dialog.component.html',
  styleUrls: ['./cita-dialog.component.scss']
})

export class CitaDialogComponent implements OnInit {

  public lstTiposCita: lstCitas[] = tiposCitasConst;
  public lstUsuarios : any[] = [];
  public lstDepartamentos : any[] = [];
  public lstPlanteles : any[] = [];
  public lstEstatusCita : any[] = estatusCitas;
  public isLoading: boolean = false;
  public filteredUsuarios: Observable<any[]>;
  public isExist : boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CitaDialogComponent>,
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


  ) {

    this.filteredUsuarios = this.formCita.controls['chrClaveUsuarioCitado'].valueChanges
      .pipe(
        startWith(''),
        map((value: string) => this._filter(value))
      );

  }


  public formCita: any = this.fb.group({
    chrClaveUsuario: [this.data.usuario],
    dtFecha: ['', Validators.required],
    chrObservaciones: ['', Validators.required],
    chrClaveDepartamento: [''],
    chrClaveUsuarioCitado: [''],
    chrEstatus: [''],
    chrPlantel: ['', Validators.required],
    dtEntrada: [''],
    dtSalida: [''],
    intMonto: [''],
    chrNombrePaciente: [''],
    chrNombreTerapeuta: [''],
    intEdad: [''],
    tipoCita: [this.data.tipoCita]
  });




  ngOnInit(): void {
    
    this.getUsuarios();
    this.setFechaActual();
    this.getDepartamentos();
    this.setEstatusCita();
    this.getPlanteles();

    /*consultamos si ya existe*/
    this.consultarCitaPorIdUsuario();

    this.formCita.get('chrClaveUsuarioCitado').setValue(this.data.nombre);
    this.formCita.get('chrClaveUsuarioCitado').disable();
    //actualmente solo funciona para el departamento de vinculacion asi que se setea por default
    this.formCita.get('chrClaveDepartamento').setValue('3');
    this.formCita.get('chrClaveDepartamento').disable();
    //el tipo de cita se setea por el tipo de cita que se recibe
    this.formCita.get('tipoCita').setValue(this.data.tipoCita);
    this.formCita.get('tipoCita').disable();
    
  }

  private async getPlanteles(): Promise<void> {
    this.lstPlanteles = await this.inscripcionesService.getEscuelas();
  }

  //set fecha actual
  setFechaActual(): void {
    let fecha = new Date();
    let fechaString = fecha.toISOString().slice(0, 10);
    this.formCita.controls['dtFecha'].setValue(fechaString);
  }

  //setEstatusCita
  setEstatusCita(): void {
    this.formCita.controls['chrEstatus'].setValue('pendiente');
    this.formCita.controls['chrEstatus'].disable();
  }

  //consultarCitaPorIdUsuario

  async consultarCitaPorIdUsuario(): Promise<void> {
    let data : any = {
      chrClaveUsuario: this.data.usuario
    }


    this.fichaService.consultarCitaPorIdUsuario(data).subscribe({
      next: (data: any) => {
        if (data.data.length > 0) {
          this.isExist = true;
          let cita = data.data[0];
          let fecha = cita.dtFecha.split(' ')[0];
          //le sumamos un dia a la fecha
          let fechaArray = fecha.split('-');
          let fechaDate = new Date(parseInt(fechaArray[0]), parseInt(fechaArray[1]) - 1, parseInt(fechaArray[2]));
          fechaDate.setDate(fechaDate.getDate() + 1);
          fecha = fechaDate.toISOString().slice(0, 10);
          cita.dtFecha = fecha;
          cita.chrClaveDepartamento = cita.chrClaveDepartamento.toString();
          this.formCita.patchValue(data.data[0]);
          this.formCita.disable();

        } else {
          this.isExist = false;
        }
      },
      error: (error) => {
        this.isExist = false;
      }
    });
  }

  //obtener departamentos
  async getDepartamentos(): Promise<void> {
   this.helpersService.getDepartamentos(this.data.usuario).subscribe({
      next: (data: any) => {
        this.lstDepartamentos = data.data;
      },
      error: (error) => {
        this.lstDepartamentos = [];
      }
    });
  }


  //usuarios de prueba
  async getUsuarios(): Promise<void> {
    let dataFake = [
      {
        chrClave: '1',
        chrNombre: 'Usuario 1'
      },
      {
        chrClave: '2',
        chrNombre: 'Usuario 2'
      },
      {
        chrClave: '3',
        chrNombre: 'Usuario 3'
      }
    ];

    this.lstUsuarios = dataFake;
  }
  onSave(): void {
    //chrClave 	chrClaveUsuario 	dtFecha 	chrObservaciones 	chrClaveDepartamento 	chrClaveUsuarioCitado 	chrEstatus 	chrPlantel 	dtEntrada 	dtSalida 	intMonto 	chrNombrePaciente 	chrNombreTerapeuta 	intEdad 	tipoCita

    let citaData : Cita = {
      chrClave: '',
      chrClaveUsuario: this.formCita.get('chrClaveUsuario').value,
      dtFecha: this.formCita.get('dtFecha').value,
      chrObservaciones: this.formCita.get('chrObservaciones').value,
      chrClaveDepartamento: this.formCita.get('chrClaveDepartamento').value,
      chrClaveUsuarioCitado: this.formCita.get('chrClaveUsuario').value,
      chrEstatus: this.formCita.get('chrEstatus').value,
      chrPlantel: this.formCita.get('chrPlantel').value,
      dtEntrada: this.formCita.get('dtEntrada').value,
      dtSalida: this.formCita.get('dtSalida').value,
      intMonto: this.formCita.get('intMonto').value,
      chrNombrePaciente: this.formCita.get('chrNombrePaciente').value,
      chrNombreTerapeuta: this.formCita.get('chrNombreTerapeuta').value,
      intEdad: this.formCita.get('intEdad').value,
      tipoCita: this.formCita.get('tipoCita').value
    }


    this.fichaService.insertarCita(citaData).subscribe({
      next: (data) => {
        let responseDatos : responseDatos = {
          chrNombre:  this.data.nombre.split(' ')[0],
          chrPaterno:  this.data.nombre.split(' ')[1],
          chrMaterno:  this.data.nombre.split(' ')[2]
        };


       
    
        let notificacion : NotificacionesInsert = {
          chrClaveDestino: '1', //cambiar por la de vinculación
          chrTipo: "3",
          chrMensaje: 'Se ha agendado una cita',
          chrStatus: 1,
          chrUrl: '/citas/citas',
          chrTitulo: 'Nueva cita',
        };


        this.helperController.insertNotification(notificacion);
        this.openSnackBar('Cita creada con exito', '👌🙌')
        this.dialogRef.close();

    

      },
      error: (error) => {
        this.openSnackBar('Ocurrio un error al crear la cita intente de nuevo', '👎😔')
      }
    });

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private _filter(value: string): any[] {
    return this.lstUsuarios.filter(usuario => usuario.chrNombre.toLowerCase().includes(value.toLowerCase()));
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}