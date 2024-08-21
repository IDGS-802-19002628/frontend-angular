import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Sexo } from '../interfaces/sexo.interface';
import { tipoSangre } from '../interfaces/tipo-sangre.interface';
import { EstadoCivil } from '../interfaces/estado-civil.interface';
import { InscripcionesService } from '../services/inscripciones.service';
import { Cp } from '../interfaces/cp.interfaces';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Estado } from '../interfaces/estados.interfaces';
import { Municipio } from '../interfaces/municipio.interfaces';
import { Cursos } from '../interfaces/cursos';
import { Escuelas } from '../interfaces/escuelas.interfaces';
import { Turnos } from '../interfaces/turnos.interfaces';
import { Inscripcion } from '../interfaces/inscripcion.interface';
import {inscripcionControllerService} from '../controller/inscripcion.controller';
import { discapacidadesConst, dondeVivesConst, estadosCivilesConst, modalidadEstudioConst, sexosConst, terminosInscripcion, tipoBecaConst, tipoSangreConst } from 'src/app/shared/helpers/helpers';
import { exportFichaInscripcionPDF } from 'src/app/shared/reports/pdf-ficha-inscripcion';
import { helperControllerService } from 'src/app/shared/helpers/helper.controller';
import { NotificacionesInsert } from 'src/app/interfaces/notificaciones';
import { DondeVives } from '../interfaces/donde-vives';
import { Discapacidad } from '../interfaces/discapacidad';
import { TipoBeca } from '../interfaces/tipo-beca';
import { ModalidadEstudio } from '../interfaces/modalidad.estudio';
@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  public title: string = 'Ficha de inscripción';
  public date: Date = new Date();
  public lstUbicaciones: Cp[] = [];
  public isLinear = false; //poner el false para pruebas
  public isLoading: boolean = false;
  public dependesEconomicamenteDePadres: boolean = true;
  public lstEstados: Estado[] = [];
  public lstMunicipiosPadre: Municipio[] = [];
  public lstMunicipiosMadre: Municipio[] = [];
  public lstCurso: Cursos[] = [];
  public lstEscuelas: Escuelas[] = [];
  public lstTurnos: Turnos[] = [];
  public terminosInscripcion: string = "";
  public sexos: Sexo[] = sexosConst;
  public tipoSangre: tipoSangre[] = tipoSangreConst;
  public estadosCiviles: EstadoCivil[] = estadosCivilesConst;
  public dondeVives: DondeVives[] = dondeVivesConst;
  public discapacidades: Discapacidad[] = discapacidadesConst;
  public tipoBeca : TipoBeca[] = tipoBecaConst;
  public modalidadEstudioPreparatoria : ModalidadEstudio[] = modalidadEstudioConst;
  firstFormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')] ],
    apellidoPaterno: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
    apellidoMaterno: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
    sexo: ['', Validators.required],
    tipoSangre: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    fechaNacimiento: ['', [Validators.required]],
    lugarNacimiento: ['', Validators.required],
    domicilio: ['', Validators.required],
    colonia: ['', Validators.required],
    ciudad: ['', Validators.required],
    entidadFederativa: ['', Validators.required],
    cp: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    telefonoCelular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    telefonoCasa: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    correoElectronico: ['', [Validators.required, Validators.email]],
    curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
    tienesDiscapacidad: ['', Validators.required],
    enfermedadCronica: ['', Validators.required],
    grupoMinoritario: ['', Validators.required],
    conQuienVives: ['', Validators.required],

  });


  secondFormGroup = this._formBuilder.group({
    trabajas: ['', Validators.required],
    empresa: ['', Validators.required],
    puesto: ['', Validators.required],
    sector: ['', Validators.required],
    direccion: ['', Validators.required],
    codigoPostal: ['', Validators.required],
    colonia: ['', Validators.required],
    ciudad: ['', Validators.required],
    ciudadEmpresa: ['', Validators.required],
    horario: ['', Validators.required],
    telefonoEmpresa: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    dependesEconomicamenteDePadres: ['', Validators.required],
    nombrePadre: ['', Validators.required],
    trabajaPadre: ['', Validators.required],
    empresaPadre: ['', Validators.required],
    puestoPadre: ['', Validators.required],
    direccionEmpresaPadre: ['', Validators.required],
    estadoEmpresaPadre: ['', Validators.required],
    ciudadEmpresaPadre: ['', Validators.required],
    telefonoPadre: ['', Validators.required],
    nombreMadre: ['', Validators.required],
    trabajaMadre: ['', Validators.required],
    empresaMadre: ['', Validators.required],
    puestoMadre: ['', Validators.required],
    direccionEmpresaMadre: ['', Validators.required],
    estadoEmpresaMadre: ['', Validators.required],
    ciudadEmpresaMadre: ['', Validators.required],
    telefonoMadre: ['', Validators.required],
  });

  fourthFormGroup = this._formBuilder.group({
    licenciatura: ['', Validators.required],
    turno: ['', Validators.required],
    campus: ['', Validators.required],
    preparatoriaEgreso: ['', Validators.required],
    direccionPreparatoria: ['', Validators.required],
    modalidadEstudioPreparatoria: ['', Validators.required],
    promedioGeneralPreparatoria: ['', Validators.required],
    participacionesReconocimientosPremios: ['', Validators.required],
    teniasBecaPrepa: ['', Validators.required],
    tipoBecaPrepa: ['', Validators.required],
    terminosYCondiciones: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private snackBar: MatSnackBar,
    private inscripcionControllerService: inscripcionControllerService,
    private helperController: helperControllerService
  ) { }

  ngOnInit(): void {
    this.firstFormGroup.get('colonia')?.disable();
    this.firstFormGroup.get('ciudad')?.disable();
    this.firstFormGroup.get('entidadFederativa')?.disable();
    this.secondFormGroup.get('colonia')?.disable();
    this.secondFormGroup.get('ciudad')?.disable();
    this.secondFormGroup.get('ciudadEmpresa')?.disable();
    this.thirdFormGroup.get('ciudadEmpresaPadre')?.disable();
    this.thirdFormGroup.get('ciudadEmpresaMadre')?.disable();
    this.fourthFormGroup.get('licenciatura')?.disable();
    this.fourthFormGroup.get('turno')?.disable();
    this.terminosInscripcion = terminosInscripcion();
    this.getEstados();
    this.getEscuelas();
  
  }

  public  async saveInscripcion() {
    this.isLoading = true;

    let data : Inscripcion = {
      chrClave: '',
      chrNombre: this.firstFormGroup.get('nombre')?.value??'',
      chrPaterno: this.firstFormGroup.get('apellidoPaterno')?.value ?? '',
      chrMaterno: this.firstFormGroup.get('apellidoMaterno')?.value ?? '',
      chrSexo: this.firstFormGroup.get('sexo')?.value ?? '',
      chrTipoSangre: this.firstFormGroup.get('tipoSangre')?.value ?? '',
      chrEstadoCivil: this.firstFormGroup.get('estadoCivil')?.value ?? '',
      dtFechaNacimiento: this.firstFormGroup.get('fechaNacimiento')?.value ?? '',
      chrLugarNacimiento: this.firstFormGroup.get('lugarNacimiento')?.value ?? '',
      chrDomicilio: this.firstFormGroup.get('domicilio')?.value ?? '',
      chrColonia: this.firstFormGroup.get('colonia')?.value ?? '',
      chrCiudad: this.firstFormGroup.get('ciudad')?.value ?? '',
      chrEntidadFederativa: this.firstFormGroup.get('entidadFederativa')?.value ?? '',
      chrCp: this.firstFormGroup.get('cp')?.value ?? '',
      chrTelefonoCelular: this.firstFormGroup.get('telefonoCelular')?.value ?? '',
      chrTelefonoCasa: this.firstFormGroup.get('telefonoCasa')?.value ?? '',
      chrCorreoElectronico: this.firstFormGroup.get('correoElectronico')?.value ?? '',
      chrTrabajas: this.secondFormGroup.get('trabajas')?.value ?? '',
      chrEmpresa: this.secondFormGroup.get('empresa')?.value ?? '',
      chrPuesto: this.secondFormGroup.get('puesto')?.value ?? '',
      chrSector: this.secondFormGroup.get('sector')?.value ?? '',
      chrDireccion: this.secondFormGroup.get('direccion')?.value ?? '',
      chrCodigoPostal: this.secondFormGroup.get('codigoPostal')?.value ?? '',
      chrColoniaEmpresa: this.secondFormGroup.get('colonia')?.value ?? '',
      chrCiudadEmpresa: this.secondFormGroup.get('ciudadEmpresa')?.value ?? '',
      chrHorario: this.secondFormGroup.get('horario')?.value ?? '',
      chrTelefonoEmpresa: this.secondFormGroup.get('telefonoEmpresa')?.value ?? '',
      chrDependesEconomicamenteDePadres: this.thirdFormGroup.get('dependesEconomicamenteDePadres')?.value ?? '',
      chrNombrePadre: this.thirdFormGroup.get('nombrePadre')?.value ?? '',
      chrTrabajaPadre: this.thirdFormGroup.get('trabajaPadre')?.value ?? '',
      chrEmpresaPadre: this.thirdFormGroup.get('empresaPadre')?.value ?? '',
      chrPuestoPadre: this.thirdFormGroup.get('puestoPadre')?.value ?? '',
      chrDireccionEmpresaPadre: this.thirdFormGroup.get('direccionEmpresaPadre')?.value ?? '',
      chrEstadoEmpresaPadre: this.lstEstados.find(x => x.clave === parseInt(this.thirdFormGroup.get('estadoEmpresaPadre')?.value ?? "0"))?.estado ?? '',
      chrCiudadEmpresaPadre: this.lstMunicipiosPadre.find(x => x.clave === parseInt(this.thirdFormGroup.get('ciudadEmpresaPadre')?.value ?? "0"))?.municipio ?? '',
      chrTelefonoPadre: this.thirdFormGroup.get('telefonoPadre')?.value ?? '',
      chrNombreMadre: this.thirdFormGroup.get('nombreMadre')?.value ?? '',
      chrTrabajaMadre: this.thirdFormGroup.get('trabajaMadre')?.value ?? '',
      chrEmpresaMadre: this.thirdFormGroup.get('empresaMadre')?.value ?? '',
      chrPuestoMadre: this.thirdFormGroup.get('puestoMadre')?.value ?? '',
      chrDireccionEmpresaMadre: this.thirdFormGroup.get('direccionEmpresaMadre')?.value ?? '',
      chrEstadoEmpresaMadre: this.lstEstados.find(x => x.clave === parseInt(this.thirdFormGroup.get('estadoEmpresaMadre')?.value ?? "0"))?.estado ?? '',
      chrCiudadEmpresaMadre: this.lstMunicipiosMadre.find(x => x.clave === parseInt(this.thirdFormGroup.get('ciudadEmpresaMadre')?.value ?? "0"))?.municipio ?? '',
      chrTelefonoMadre: this.thirdFormGroup.get('telefonoMadre')?.value ?? '',
      chrLicenciatura: this.fourthFormGroup.get('licenciatura')?.value ?? '',
      chrClaveTurno: this.fourthFormGroup.get('turno')?.value ?? '',
      chrClaveEscuela: this.fourthFormGroup.get('campus')?.value ?? '',
      chrPreparatoriaEgreso: this.fourthFormGroup.get('preparatoriaEgreso')?.value ?? '',
      chrDireccionPreparatoria: this.fourthFormGroup.get('direccionPreparatoria')?.value ?? '',
      chrTerminosYCondiciones: this.fourthFormGroup.get('terminosYCondiciones')?.value ?? '',
      chrClaveAlumno : '',
      chrCurp: this.firstFormGroup.get('curp')?.value ?? '',
      chrTienesDiscapacidad: this.firstFormGroup.get('tienesDiscapacidad')?.value ?? '',
      chrEnfermedadCronica: this.firstFormGroup.get('enfermedadCronica')?.value ?? '',
      chrGrupoMinoritario: this.firstFormGroup.get('grupoMinoritario')?.value ?? '',
      chrConQuienVives: this.firstFormGroup.get('conQuienVives')?.value ?? '',
      chrModalidadEstudioPreparatoria: this.fourthFormGroup.get('modalidadEstudioPreparatoria')?.value ?? '',
      chrPromedioGeneralPreparatoria: this.fourthFormGroup.get('promedioGeneralPreparatoria')?.value ?? '',
      chrParticipacionesReconocimientosPremios: this.fourthFormGroup.get('participacionesReconocimientosPremios')?.value ?? '',
      chrTeniasBecaPrepa: this.fourthFormGroup.get('teniasBecaPrepa')?.value ?? '',
      chrTipoBecaPrepa: this.fourthFormGroup.get('tipoBecaPrepa')?.value ?? ''

    };

    let sendData = {
      data: data
    };

    this.inscripcionesService.insertInscripcion(sendData).subscribe({
      next: async (data: any) => {
        this.openSnackBar('Inscripción realizada correctamente', '😊👍');
        let nombreCompleto = this.firstFormGroup.get('nombre')?.value + ' ' + this.firstFormGroup.get('apellidoPaterno')?.value + ' ' + this.firstFormGroup.get('apellidoMaterno')?.value;
        this.viewPdf(data.data.id, nombreCompleto);

        let notificacion : NotificacionesInsert = {
          chrClaveDestino: '1',
          chrTipo: "3",
          chrMensaje: 'Se ha realizado una nueva inscripción',
          chrStatus: 1,
          chrUrl: '/alumnos/listado-inscripciones',
          chrTitulo: 'Nueva inscripción'
        };


        await this.helperController.insertNotification(notificacion);
        window.location.reload();
        this.isLoading = false;
      },
      error: (error) => {
        this.openSnackBar('Error al realizar la inscripción', '😈😱');
        this.isLoading = false;
      }
    });

  }
  private async getTurnos(escuela: string = '') {
    this.lstTurnos =  await this.inscripcionControllerService.getTurnos(escuela);
  }

  public async viewPdf(chrClave: string, nombreCompleto: string) {

    this.isLoading = true;

      let data = await this.inscripcionControllerService.getInscripcionByClave(chrClave);
      let sendData = {
        data: data
      }

    exportFichaInscripcionPDF(sendData.data, nombreCompleto,true);
    this.isLoading = false;
    
  }

  private async getEscuelas() {
   this.lstEscuelas = await this.inscripcionControllerService.getEscuelas();
    
  }

  private async getCursosByEscuela(escuela: string) {
    this.lstCurso = await this.inscripcionControllerService.getCursosByEscuela(escuela);
  }
  
  private async getEstados() {
    this.lstEstados = await this.inscripcionControllerService.getEstados();
  }


  public async getDataByCP() {
    
    this.isLoading = true;
    let cp = this.firstFormGroup.get('cp')?.value || '';
    if (cp.length < 5) {
      this.bloquearCamposDatosPersonales();
      this.openSnackBar('El código postal debe tener 5 caracteres', '😱');
      this.isLoading = false;
      return;
    }

    let response =  await this.inscripcionControllerService.getDataByCP(cp);
    if (response.length === 0) {
      this.bloquearCamposDatosPersonales();
      this.isLoading = false;
      return;
    }

    this.lstUbicaciones = response;
    this.firstFormGroup.get('colonia')?.enable();
    this.firstFormGroup.get('ciudad')?.setValue(this.lstUbicaciones[0].municipio);
    this.firstFormGroup.get('entidadFederativa')?.setValue(this.lstUbicaciones[0].estado);
    this.isLoading = false;

  }

  public getDataByCPEmpresa() {
    this.isLoading = true;
    //contar los caracteres y solo mandar hasta que sean 5
    let cp = this.secondFormGroup.get('codigoPostal')?.value || '';
    if (cp.length < 5) {
      //borrar la lista de ubicaciones
      this.lstUbicaciones = [];
      this.secondFormGroup.get('colonia')?.disable();
      this.secondFormGroup.get('colonia')?.setValue('');
      this.secondFormGroup.get('ciudad')?.setValue('');
      this.secondFormGroup.get('ciudadEmpresa')?.setValue('');
      this.openSnackBar('El código postal debe tener 5 caracteres', '😱');
      this.isLoading = false;
      return;
    }

    this.inscripcionesService.getDataByCP(cp).subscribe({
      next: (data: any) => {
        if (data.respuesta) {
          this.lstUbicaciones = data.respuesta.codigos_postales;
          this.secondFormGroup.get('colonia')?.enable();
          this.secondFormGroup.get('ciudad')?.setValue(this.lstUbicaciones[0].municipio);
          this.secondFormGroup.get('ciudadEmpresa')?.setValue(this.lstUbicaciones[0].municipio);
          this.openSnackBar('Datos cargados correctamente', '😊👍');
        } else {
          this.lstUbicaciones = [];
          this.secondFormGroup.get('colonia')?.disable();
          this.secondFormGroup.get('colonia')?.setValue('');
          this.secondFormGroup.get('ciudad')?.setValue('');
          this.secondFormGroup.get('ciudadEmpresa')?.setValue('');
          this.secondFormGroup.get('codigoPostal')?.setErrors({ invalidCP: true });
          this.openSnackBar('Código postal no encontrado', '😈😱');
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.openSnackBar('Error al cargar los datos', '😈😱');
        this.isLoading = false;
      }
    });

  }

  public changeCampus(event: any) {
    this.getCursosByEscuela(event.value);
    this.getTurnos(event.value);
    this.fourthFormGroup.get('turno')?.enable();
    this.fourthFormGroup.get('licenciatura')?.enable();
  }

  public changeTrabajas(event: any) {
    if (event.value === 'si') {
      this.secondFormGroup.get('empresa')?.enable();
      this.secondFormGroup.get('puesto')?.enable();
      this.secondFormGroup.get('sector')?.enable();
      this.secondFormGroup.get('direccion')?.enable();
      this.secondFormGroup.get('codigoPostal')?.enable();
      this.secondFormGroup.get('colonia')?.enable();
      this.secondFormGroup.get('horario')?.enable();
      this.secondFormGroup.get('telefonoEmpresa')?.enable();
    } else {
      this.secondFormGroup.get('empresa')?.disable();
      this.secondFormGroup.get('puesto')?.disable();
      this.secondFormGroup.get('sector')?.disable();
      this.secondFormGroup.get('direccion')?.disable();
      this.secondFormGroup.get('codigoPostal')?.disable();
      this.secondFormGroup.get('colonia')?.disable();
      this.secondFormGroup.get('ciudad')?.disable();
      this.secondFormGroup.get('ciudadEmpresa')?.disable();
      this.secondFormGroup.get('horario')?.disable();
      this.secondFormGroup.get('telefonoEmpresa')?.disable();
    }
  }


  public changeEstadoEmpresaPadre(event: any) {
    this.inscripcionesService.getMunicipiosByEstado(event.value).subscribe({
      next: (data: any) => {
        this.lstMunicipiosPadre = data.respuesta.municipios;
        this.thirdFormGroup.get('ciudadEmpresaPadre')?.enable();

      },
      error: (error) => {
        this.openSnackBar('Error al cargar los municipios', '😈😱');
      }
    });
  }

  public changeEstadoEmpresaMadre(event: any) {
    this.inscripcionesService.getMunicipiosByEstado(event.value).subscribe({
      next: (data: any) => {
        this.lstMunicipiosMadre = data.respuesta.municipios;
        this.thirdFormGroup.get('ciudadEmpresaMadre')?.enable();

      },
      error: (error) => {
        this.openSnackBar('Error al cargar los municipios', '😈😱');
      }
    });

  }

  public changeTrabajaPadre(event: any) {
    if (event.value === 'si') {
      this.thirdFormGroup.get('empresaPadre')?.enable();
      this.thirdFormGroup.get('puestoPadre')?.enable();
      this.thirdFormGroup.get('direccionEmpresaPadre')?.enable();
      this.thirdFormGroup.get('estadoEmpresaPadre')?.enable();
      this.thirdFormGroup.get('ciudadEmpresaPadre')?.enable();
    } else {
      this.thirdFormGroup.get('empresaPadre')?.disable();
      this.thirdFormGroup.get('puestoPadre')?.disable();
      this.thirdFormGroup.get('direccionEmpresaPadre')?.disable();
      this.thirdFormGroup.get('estadoEmpresaPadre')?.disable();
      this.thirdFormGroup.get('ciudadEmpresaPadre')?.disable();
    }
  }

  public changeTrabajaMadre(event: any) {
    if (event.value === 'si') {
      this.thirdFormGroup.get('empresaMadre')?.enable();
      this.thirdFormGroup.get('puestoMadre')?.enable();
      this.thirdFormGroup.get('direccionEmpresaMadre')?.enable();
      this.thirdFormGroup.get('estadoEmpresaMadre')?.enable();
      this.thirdFormGroup.get('ciudadEmpresaMadre')?.enable();
    } else {
      this.thirdFormGroup.get('empresaMadre')?.disable();
      this.thirdFormGroup.get('puestoMadre')?.disable();
      this.thirdFormGroup.get('direccionEmpresaMadre')?.disable();
      this.thirdFormGroup.get('estadoEmpresaMadre')?.disable();
      this.thirdFormGroup.get('ciudadEmpresaMadre')?.disable();
    }
  }

  private bloquearCamposDatosPersonales() {
    this.lstUbicaciones = [];
    this.firstFormGroup.get('colonia')?.disable();
    this.firstFormGroup.get('colonia')?.setValue('');
    this.firstFormGroup.get('ciudad')?.setValue('');
    this.firstFormGroup.get('entidadFederativa')?.setValue('');
    this.firstFormGroup.get('cp')?.setErrors({ invalidCP: true });
  }


  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }

}