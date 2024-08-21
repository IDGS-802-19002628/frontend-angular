import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Archivos } from 'src/app/interfaces/archivos';
import { User } from 'src/app/interfaces/user';
import { ProfilesControllerService } from '../../controller/profiles.controller.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Maestro } from '../../interfaces/maestro';
import { MatDialog } from '@angular/material/dialog';
import { FileDialogComponent } from 'src/app/shared/dialogs/file-dialog/file-dialog.component';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profile-maestro',
  templateUrl: './profile-maestro.component.html',
  styleUrls: ['./profile-maestro.component.scss']
})
export class ProfileMaestroComponent implements OnInit {

  public isLoading: boolean = false;
  private lstFiles: any[] = [];
  public humaniUser!: User;
  public lstArchivosMaestro: Maestro[] = [];
  public isDatosMaestro: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private ProfileServicesController: ProfilesControllerService,
    private jwtHelper: JwtHelperService,
    public dialog: MatDialog
  ) { }

  public FormFilesMaestro = this._formBuilder.group({

    chrActaNacimiento: ['', Validators.required],
    chrIne: ['', Validators.required],
    chrCurp: ['', Validators.required],
    chrConstanciaSituacionFiscal: ['', Validators.required],
    chrComprobanteDomicilio: ['', Validators.required],
    chrCurriculum: ['', Validators.required],
    chrTitulo: ['', Validators.required],
    chrCedula: ['', Validators.required],
    chrComprobanteDC: ['', Validators.required],
    chrComprobanteIngresos: ['', Validators.required],


  });

  public async ngOnInit() {
    this.isLoading = true;

      await this.getDatosUsuario().then(() => {
      this.humaniUser.chrClave;
      });
      await this.getArchivosMaestro();
       this.isLoading = false;
  }


  private getArchivosMaestro = async () => {

    let archivos = await this.ProfileServicesController.getArchivos(this.humaniUser.chrClave);
    this.lstArchivosMaestro = archivos;
    this.isDatosMaestro = this.lstArchivosMaestro.length > 0;

    let archivosFaltantes = ['chrActaNacimiento', 'chrIne', 'chrCurp', 'chrConstanciaSituacionFiscal', 'chrComprobanteDomicilio', 'chrCurriculum', 'chrTitulo', 'chrCedula', 'chrComprobanteDC', 'chrComprobanteIngresos'];

    let archivosFaltantesEncontrados = archivosFaltantes.filter(archivo => archivos.find(arch => arch.nombre === archivo));

    if (archivosFaltantesEncontrados.length > 0) {
      archivosFaltantesEncontrados.forEach(archivo => {
        this.lstArchivosMaestro.push({
          nombre: archivo, ruta: '', extension: '', tamano: '', fecha: '', hora: '', usuario: '', tipo: '', estado: '', descripcion: '', id_carpeta: '',
          id: 0
        });
      });
    }
  }


  private getDatosUsuario(): Promise<void> {
    return new Promise((resolve) => {
      let usuario = sessionStorage.getItem('token');
      if (usuario) {
        this.humaniUser = this.jwtHelper.decodeToken(usuario).data;
      }
      resolve();

    });
  }

  abrirArchivo(archivo: Maestro): void {
    const url = this.getGoogleDriveUrl(archivo.ruta);
    window.open(url, '_blank');
  }

  getGoogleDriveUrl(ruta: string): string {
    return `https://drive.google.com/file/d/${ruta}/view`;
  }


  //editar archivo
  editarArchivo(archivo: Maestro): void {

    //abrir el dialogo para editar el archivo
    const dialogRef = this.dialog.open(FileDialogComponent, {
      width: '400px',
      data: { nombre: archivo.nombre, id: archivo.id, usuario: this.humaniUser.chrClave }
    });

    //cuando se cierra el dialogo
    dialogRef.afterClosed().subscribe(result => {

      //si no hay error
      if (!result.error) {

        //mostrar mensaje de exito
        this.openSnackBar('Archivo actualizado correctamente', '🤟🤩');
        //obtener los archivos del maestro
        this.getDatosUsuario();
        this.getArchivosMaestro();
      }
      else {
        this.openSnackBar('Error al actualizar el archivo', '🤯😈');

      }
    });
  }

  descargarArchivo(archivo: Maestro): void {

    //crear un link para descargar el archivo
    const url = this.getGoogleDriveUrl(archivo.ruta);

    //crear un link para descargar el archivo
    const link = document.createElement('a');


    //asignar los atributos al link
    link.href = url;
    link.download = archivo.nombre;
    link.target = '_blank';

    link.click();
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
      this.lstFiles.push({ file: base64, controlName: controlName });
      //poner el nombre del archivo en el input
      this.FormFilesMaestro.get(controlName)?.setValue(file.name);
    }
  }

  onDragOver(event: any) {

    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';

    }
  }

  public onDrop(event: DragEvent, controlName: string) {
    this.lstFiles = this.lstFiles.filter(file => file.controlName !== controlName);
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        let base64 = reader.result;
        this.lstFiles.push({ file: base64, controlName: controlName });
        this.FormFilesMaestro.get(controlName)?.setValue(files[0].name);
      }
    }
  }

  public async guardarArchivos() {

    for (let file of this.lstFiles) {
      let data: Archivos = {
        data: {
          file: file.file,
          name: file.controlName.replace('chr', ''),
          chrClaveUsuario: this.humaniUser.chrClave,
          estatus: 'pendiente'

        }
      }
      await this.ProfileServicesController.uploadFile(data);
    }
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);


  }

}

