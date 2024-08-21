import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { helperControllerService } from 'src/app/shared/helpers/helper.controller';
import { inscripcionesControllerService } from '../../controller/inscripcion.controller';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscripcion } from '../../interfaces/inscripcion.interface';
import { Cursos } from '../../interfaces/cursos';
import { Escuelas } from '../../interfaces/escuelas.interfaces';
import { tipoSangre } from '../../interfaces/tipo-sangre.interface';
import { Sexo } from '../../interfaces/sexo.interface';
import { EstadoCivil } from '../../interfaces/estado-civil.interface';
import { inscripcionControllerService } from 'src/app/pages/inscripciones/controller/inscripcion.controller';
import { Estado } from '../../interfaces/estados.interfaces';
import { Turnos } from '../../interfaces/turnos.interfaces';
import { User } from 'src/app/interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { exportFichaInscripcionPDF } from 'src/app/shared/reports/pdf-ficha-inscripcion';
import { Archivos } from 'src/app/interfaces/archivos';
import { ReporteTotalInscripcion } from '../../interfaces/reporteTotalInscripcio';
import { ArchivosAlumno, agregarAlumno } from '../../interfaces/alumno';
import {FileDialogComponent} from '../../../../shared/dialogs/file-dialog/file-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-detalle-inscripcion',
  templateUrl: './detalle-inscripcion.component.html',
  styleUrls: ['./detalle-inscripcion.component.scss']
})
export class DetalleInscripcionComponent implements OnInit {
  public isLoading: boolean = false;
  private lstFiles: any[] = [];
  public idInscripcion: string = '';
  public lstCurso: Cursos[] = [];
  public lstEscuelas: Escuelas[] = [];
  public lstTurnos: Turnos[] = [];
  private password: string = '';
  private humaniUser!: User;
  public fecha = new Date();
  public  isInscrito: boolean = false;
  public lstArchivos: ArchivosAlumno[] = [];
  public sexos: Sexo[] = [
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'femenino', viewValue: 'Femenino' },
  ];

  public tipoSangre: tipoSangre[] = [
    { value: 'O-', viewValue: 'O-' },
    { value: 'O+', viewValue: 'O+' },
    { value: 'A-', viewValue: 'A-' },
    { value: 'A+', viewValue: 'A+' },
    { value: 'B-', viewValue: 'B-' },
    { value: 'B+', viewValue: 'B+' },
    { value: 'AB-', viewValue: 'AB-' },
    { value: 'AB+', viewValue: 'AB+' },
  ];

  public estadosCiviles: EstadoCivil[] = [
    { value: 'soltero', viewValue: 'Soltero' },
    { value: 'casado', viewValue: 'Casado' },
    { value: 'divorciado', viewValue: 'Divorciado' },
    { value: 'viudo', viewValue: 'Viudo' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private validar : helperControllerService,
    private inscripcionController: inscripcionesControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inscripcionControllerService: inscripcionControllerService,
    private jwtHelper: JwtHelperService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }
 
  firstFormGroup = this._formBuilder.group({
    chrNombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')] ],
    chrPaterno: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
    chrMaterno: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
    chrSexo: ['', Validators.required],
    chrTipoSangre: ['', Validators.required],
    chrEstadoCivil: ['', Validators.required],
    dtFechaNacimiento: ['', [Validators.required]],
    chrLugarNacimiento: ['', Validators.required],
    chrDomicilio: ['', Validators.required],
    chrColonia: ['', Validators.required],
    chrCiudad: ['', Validators.required],
    chrEntidadFederativa: ['', Validators.required],
    chrCp: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    chrTelefonoCelular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    chrTelefonoCasa: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    chrCorreoElectronico: ['', [Validators.required, Validators.email]],
    chrCurp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],

  });



  secondFormGroup = this._formBuilder.group({
    chrTrabajas: ['', Validators.required],
    chrEmpresa: ['', Validators.required],
    chrPuesto: ['', Validators.required],
    chrSector: ['', Validators.required],
    chrDireccion: ['', Validators.required],
    chrCodigoPostal: ['', Validators.required],
    chrColoniaEmpresa: ['', Validators.required],
    chrCiudadEmpresa: ['', Validators.required],
    chrHorario: ['', Validators.required],
    chrTelefonoEmpresa: ['', Validators.required],
  });



  thirdFormGroup = this._formBuilder.group({
    chrDependesEconomicamenteDePadres: ['', Validators.required],
    chrNombrePadre: ['', Validators.required],
    chrTrabajaPadre: ['', Validators.required],
    chrEmpresaPadre: ['', Validators.required],
    chrPuestoPadre: ['', Validators.required],
    chrDireccionEmpresaPadre: ['', Validators.required],
    chrEstadoEmpresaPadre: ['', Validators.required],
    chrCiudadEmpresaPadre: ['', Validators.required],
    chrTelefonoPadre: ['', Validators.required],
    chrNombreMadre: ['', Validators.required],
    chrTrabajaMadre: ['', Validators.required],
    chrEmpresaMadre: ['', Validators.required],
    chrPuestoMadre: ['', Validators.required],
    chrDireccionEmpresaMadre: ['', Validators.required],
    chrEstadoEmpresaMadre: ['', Validators.required],
    chrCiudadEmpresaMadre: ['', Validators.required],
    chrTelefonoMadre: ['', Validators.required],
  });

  fourthFormGroup = this._formBuilder.group({
    chrLicenciatura: ['', Validators.required],
    chrClaveTurno: ['', Validators.required],
    chrClaveEscuela: ['', Validators.required],
    chrPreparatoriaEgreso: ['', Validators.required],
    chrDireccionPreparatoria: ['', Validators.required],
    chrTerminosYCondiciones: ['', Validators.required],
  });

  fifthFormGroup = this._formBuilder.group({
    chrMatricula: ['', Validators.required],
    chrRFC: ['', Validators.required],
    chrFotografia: ['', Validators.required],  
    chrActaNacimiento: ['', Validators.required],
    chrCertificadoPreparatoria: ['', Validators.required],
    chrCurp: ['', Validators.required],
    chrCertificadoMedico: ['', Validators.required],
    chrCartaNoAntecedentesPenales: ['', Validators.required],
    chrCartaAceptacion: ['', Validators.required],
    chrPagoInscripcion: ['', Validators.required],
    //CADA ARCHIVO PUEDE SER JUSTIFICANTE
    ischrActaNacimiento: [''],
    ischrCertificadoPreparatoria: [''],
    ischrCurp: [''],
    ischrCertificadoMedico: [''],
    ischrCartaNoAntecedentesPenales: [''],
    ischrCartaAceptacion: [''],
    ischrPagoInscripcion: [''],



  });

 
  public async ngOnInit() {
    if (! await this.validarPermiso()){
      this.router.navigate(['/']);
      return;
    }
    this.isLoading = true;
    await this.getEscuelas();
    await this.getDataByUrl();
    await this.getInscripcion();
    await this.getDatosUsuario();
    //si ya esta inscrito hay que traernos los archivos
    if (this.isInscrito) {
      await this.getArchivos();
    }
    this.isLoading = false;
  }

  private getArchivos = async () => {
    let archivos = await this.inscripcionController.getArchivos(this.fifthFormGroup.get('chrMatricula')?.value ?? '');
    this.lstArchivos = archivos;
    //hay que ver si estan todos los archivos
    let archivosFaltantes = ['Fotografia','ActaNacimiento','CertificadoPreparatoria','Curp','CertificadoMedico','CartaNoAntecedentesPenales','CartaAceptacion','PagoInscripcion'];
    //hay que buscar los archivos que faltan
    let archivosFaltantesEncontrados = archivosFaltantes.filter(archivo => !archivos.find(arch => arch.nombre === archivo));
    //si hay archivos faltantes se ponen en la lista de archivos
    if (archivosFaltantesEncontrados.length > 0) {
      archivosFaltantesEncontrados.forEach(archivo => {
        this.lstArchivos.push({
          id: 0,
          nombre: archivo,
          descripcion: 'Archivo subido',
          estado: 'No subido',
          extension: '',
          fecha: '',
          hora: '',
          id_carpeta: '',
          ruta: '',
          tamano: '0',
          tipo: 'NohayArchivo/NoSubido',
          usuario: this.fifthFormGroup.get('chrMatricula')?.value ?? ''
        });
      });
    }

  }

  private  async  validarPermiso() : Promise<boolean> {
    return new Promise(async (resolve) => {
      let permiso =  await this.validar.validarPermisos({permiso: 'inscripcion'});
      resolve(permiso);
    });
  }

  private getDatosUsuario() : Promise<void> {
    return new Promise((resolve) => {
    let usuario = sessionStorage.getItem('token');
    if (usuario) {
      this.humaniUser = this.jwtHelper.decodeToken(usuario).data;
    }
    resolve();
    
    });
  }

  public getDataByUrl = async () => {
    this.activatedRoute.params.subscribe(async dataFact => {
      const { id } = dataFact;
      this.idInscripcion = id;
    }); 
  }

  abrirArchivo(archivo: ArchivosAlumno): void {
    const url = this.getGoogleDriveUrl(archivo.ruta);
    window.open(url, '_blank');
  }

  editarArchivo(archivo: ArchivosAlumno): void {
    const dialogRef = this.dialog.open(FileDialogComponent, {
      width: '500px',
      data: { nombre: archivo.nombre, id: archivo.id, usuario:  this.fifthFormGroup.get('chrMatricula')?.value ?? '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result.error) {
        this.openSnackBar('Archivo actualizado correctamente', '🤟🤩');
        this.getInscripcion();
        this.getArchivos();
      } else {
        this.openSnackBar('Error al actualizar el archivo', '🤯😈');
      }
    });
  }

  descargarArchivo(archivo: ArchivosAlumno): void {
    const url = this.getGoogleDriveUrl(archivo.ruta);
    const link = document.createElement('a');
    link.href = url;
    link.download = archivo.nombre;
    link.target = '_blank';
    link.click();

  }

  getGoogleDriveUrl(ruta: string): string {
    return `https://drive.google.com/file/d/${ruta}/view`;
  }

  public async getInscripcion() {
    this.isLoading = true;
    const response = await this.inscripcionController.getInscripcionByClave(this.idInscripcion);
    if (response) {
      let inscripcion: Inscripcion = response;
      this.firstFormGroup.patchValue(inscripcion);
      this.secondFormGroup.patchValue(inscripcion);
      this.thirdFormGroup.patchValue(inscripcion);
      this.fourthFormGroup.patchValue(inscripcion);
  
      this.isInscrito = parseInt(inscripcion.intEstatus) === 2 ? true : false;
      //no se me manda las claves de la escuela y el turno y la licenciatura solo el nombre entonces vamos a filtrarlos
      let escuela = this.lstEscuelas.find(escuela => escuela.chrNombre === inscripcion.chrClaveEscuela);

      if (escuela) {
      this.fourthFormGroup.get('chrClaveEscuela')?.setValue(escuela?.chrClave);
       await this.getCursosByEscuela(escuela.chrClave);
       await this.getTurnos(escuela.chrClave);
       let turno = this.lstTurnos.find(turno => turno.chrNombre === inscripcion.chrClaveTurno);
      let curso = this.lstCurso.find(curso => curso.chrNombre === inscripcion.chrLicenciatura);
      if (curso) {
        this.fourthFormGroup.get('chrLicenciatura')?.setValue(curso.chrClave);
      } if (turno) {
        this.fourthFormGroup.get('chrClaveTurno')?.setValue(turno.chrClave);

      }
     }
      if (this.isInscrito) {
        this.fifthFormGroup.disable();
        this.fourthFormGroup.disable();
        this.thirdFormGroup.disable();
        this.secondFormGroup.disable();
        this.firstFormGroup.disable();
        //asignar la matricula
        this.fifthFormGroup.get('chrMatricula')?.setValue(inscripcion.chrClaveAlumno);
        
      } else {
      await this.generarMatricula();
      }

    }
    this.isLoading = false;
  }

  public async viewPdf() {
    this.isLoading = true;
    let nombreCompleto = `${this.humaniUser.chrNombre} ${this.humaniUser.chrPaterno} ${this.humaniUser.chrMaterno}`;
      let data = await this.inscripcionController.getInscripcionByClave(this.idInscripcion);
      let sendData = {data: data}
      exportFichaInscripcionPDF(sendData.data, nombreCompleto,false);
    this.isLoading = false;
  }

  public async generarMatricula() {
    this.isLoading = true;
    let mE =   this.fourthFormGroup.get('chrClaveEscuela')?.value?.replace(/^0+/, '');//agarra la primera letra de la escuela
    let mL =   this.lstCurso.find(curso => curso.chrClave === this.fourthFormGroup.get('chrLicenciatura')?.value)?.chrNombre?.charAt(0); //agarra la primera letra de la licenciatura
    let mM =    new Date().getMonth() + 1; //agarra el mes
    let mY =   new Date().getFullYear().toString().slice(-2); //agarra los ultimos dos digitos del año
      let data :  ReporteTotalInscripcion = {
        data: {
          chrTipo: 'inscripcion',
          dtMes: `${mM}`,
          dtYear: `${mY}`,
          chrClaveEscuela: `${this.fourthFormGroup.get('chrClaveEscuela')?.value}`,
          chrClaveCurso: `${this.fourthFormGroup.get('chrLicenciatura')?.value}`
        }
      }
    let mI =  await this.inscripcionController.getAlumnosTotales(data) + 1; //se obtiene el total de alumnos y se le suma 1
    let mIC = mI.toString().length; //se obtiene la longitud de la matricula
    let mIf = mIC === 1 ? `00${mI}` : mIC === 2 ? `0${mI}` : mI; //si la longitud es 1 se le agrega 00 si es 2 se le agrega 0 si es 3 no se le agrega nada
    let matricula = `${mE}${mL}${mM}${mY}${mIf}`; //se concatena todo
    this.password = matricula; //se guarda la matricula en el password 
    this.fifthFormGroup.get('chrMatricula')?.setValue(matricula) //se pone la matricula en el input
    this.isLoading = false;
  }


  private async getEscuelas() {
    this.lstEscuelas = await this.inscripcionControllerService.getEscuelas();
    
   }
 
   private async getCursosByEscuela(escuela: string) {
     this.lstCurso = await this.inscripcionControllerService.getCursosByEscuela(escuela);
   }
   
   private async getTurnos(escuela: string = '') {
    this.lstTurnos =  await this.inscripcionControllerService.getTurnos(escuela);
  }

  public changeCampus(event: any) {
    this.generarMatricula();
    this.getCursosByEscuela(event.value);
    this.getTurnos(event.value);
    this.fourthFormGroup.get('turno')?.enable();
    this.fourthFormGroup.get('licenciatura')?.enable();
    
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
        this.fifthFormGroup.get(controlName)?.setValue(file.name);
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
        this.fifthFormGroup.get(controlName)?.setValue(files[0].name);
      }
    }
  }

  public async guardar() {
  this.isLoading = true;

  for (let file of this.lstFiles) {
    //justificante de los archivos
    let justificante = this.fifthFormGroup.get(`is${file.controlName}`)?.value;
    let data : Archivos = {
      data: {
        file: file.file,
        name: file.controlName.replace('chr',''),
        chrClaveUsuario: this.fifthFormGroup.get('chrMatricula')?.value ?? '',
        //si esta en true es justificante 
        estatus: justificante ? 'espera' : 'aceptado'
      }
    }

    await this.inscripcionController.uploadFile(data);
  }

  //recuperamos ela rchivo de la foto
  let foto = this.lstFiles.find(file => file.controlName === 'chrFotografia');
  //ahora lo convertimos a base64 y lo guardamos en una variable para despues guardarlo en la inscripcion
  let fotoBase64 = foto ? foto.file : '';
  //si no hay foto se pone una por default que estan en assets/images/profile/user-1.jpg
  //hay que poner un numero aleatorio del 1 al 5
  let numero = Math.floor(Math.random() * 5) + 1;
  fotoBase64 = fotoBase64 ? fotoBase64 : `assets/images/profile/user-${numero}.jpg`;



  //una vez que se suben los archivos se guarda la inscripcion
  //vamos a crear el objeto inscripcion
  let data : agregarAlumno = {
    data: {
      chrClave: this.fifthFormGroup.get('chrMatricula')?.value ?? '',
      chrTipoUsuario: 'alumno',
      chrModalidad: this.fourthFormGroup.get('chrClaveTurno')?.value ?? '',
      chrClaveEscuela: this.fourthFormGroup.get('chrClaveEscuela')?.value ?? '',
      chrNombre: this.firstFormGroup.get('chrNombre')?.value ?? '',
      chrPaterno: this.firstFormGroup.get('chrPaterno')?.value ?? '',
      chrMaterno: this.firstFormGroup.get('chrMaterno')?.value ?? '',
      chrGenero: this.firstFormGroup.get('chrSexo')?.value ?? '',
      chrCurp: this.firstFormGroup.get('chrCurp')?.value ?? '',
      chrDomicilio: this.firstFormGroup.get('chrDomicilio')?.value ?? '',
      chrTelefono: this.firstFormGroup.get('chrTelefonoCelular')?.value ?? '',
      chrEmail: this.firstFormGroup.get('chrCorreoElectronico')?.value ?? '',
      chrRFC: this.fifthFormGroup.get('chrRFC')?.value ?? '',
      chrEscuelaProcedencia: this.fourthFormGroup.get('chrPreparatoriaEgreso')?.value ?? '',
      chrPracticasProf: 'no',
      chrServicioCom: 'no',
      chrPassword: this.password,
      chrStatus: 'activo',
      chrFoto: fotoBase64,
      dtAltaUsuario: "",
      idFichaInscripcion: this.idInscripcion,
      dtFechaNacimiento: this.firstFormGroup.get('dtFechaNacimiento')?.value ?? '',
      dtMes :  new Date().getMonth() + 1, //agarra el mes,
      dtYear : new Date().getFullYear().toString().slice(-2), 
      chrClaveCurso  : this.fourthFormGroup.get('chrLicenciatura')?.value ?? '' 
    }
  }

  await this.inscripcionController.insertAlumno(data);

  this.isLoading = false;
  //obtener de nuevo los datos
  await this.getInscripcion();
  

  }
  

  public cancelar = () => {
      this.router.navigate(['/alumnos/listado-inscripciones']);
  }
  
  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
        duration: 3000,
    });
}

}
