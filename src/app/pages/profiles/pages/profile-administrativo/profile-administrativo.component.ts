import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Archivos } from 'src/app/interfaces/archivos';
import { User } from 'src/app/interfaces/user';
import { ProfilesControllerService } from '../../controller/profiles.controller.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Maestro } from '../../interfaces/maestro';
import { FileDialogComponent } from 'src/app/shared/dialogs/file-dialog/file-dialog.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-administrativo',
  templateUrl: './profile-administrativo.component.html',
  styleUrls: ['./profile-administrativo.component.scss']
})
export class ProfileAdministrativoComponent implements OnInit {

  isLoading: boolean = false;
  private lstFilesAdmin: any[] = [];
  public humaniUser!: User;
  public lstArchivosAdmin: Maestro[] = [];
  public isDatosAdministrativo : boolean = false;


  constructor(

    private _formBuilder: FormBuilder,
    private ProfileServicesController: ProfilesControllerService,
    private jwtHelper: JwtHelperService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog


  ) { }

  public FormFilesAdministrativo = this._formBuilder.group({

    chrActaNacimiento: ['', Validators.required],
    chrIne: ['', Validators.required],
    chrCurp: ['', Validators.required],
    chrConstanciaSituacionFiscal: ['', Validators.required],
    chrClabeBancaria: ['', Validators.required],
    chrComprobanteDomicilio: ['', Validators.required],
    chrCurriculum: ['', Validators.required],
    chrNss: ['', Validators.required],
    chrRfc: ['', Validators.required],


  });


  ngOnInit(): void {
    this.isLoading = true;
    this.getDatosUsuario().then(() => {
      this.humaniUser.chrClave
    });
    this.getArchivosAdmin();
    this.isLoading = false;

    
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


  public onDrop(event: DragEvent, controlName: string) {
    this.lstFilesAdmin = this.lstFilesAdmin.filter(file => file.controlName !== controlName);
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {

      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        let base64 = reader.result;
        this.lstFilesAdmin.push({ file: base64, controlName: controlName });
        this.FormFilesAdministrativo.get(controlName)?.setValue(files[0].name);
      }
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  public onFileSelected(event: any, controlName: string) {

    this.lstFilesAdmin = this.lstFilesAdmin.filter(file => file.controlName !== controlName);

    const file: File = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64 = reader.result;
      this.lstFilesAdmin.push({ file: base64, controlName: controlName });
      this.FormFilesAdministrativo.get(controlName)?.setValue(file.name);
    }

  }

  private getArchivosAdmin = async () => {

    let archivos = await this.ProfileServicesController.getArchivos(this.humaniUser.chrClave);
    this.lstArchivosAdmin = archivos;
    this.isDatosAdministrativo = this.lstArchivosAdmin.length > 0;
    let archivosFaltantes = ['chrActaNacimiento', 'chrIne', 'chrCurp', 'chrConstanciaSituacionFiscal', 'chrComprobanteDomicilio', 'chrCurriculum', 'chrTitulo', 'chrCedula', 'chrComprobanteDC', 'chrComprobanteIngresos'];

    let archivosFaltantesEncontrados = archivosFaltantes.filter(archivo => archivos.find(arch => arch.nombre === archivo));

    if (archivosFaltantesEncontrados.length > 0) {
      archivosFaltantesEncontrados.forEach(archivo => {
        this.lstArchivosAdmin.push({
          nombre: archivo, ruta: '', extension: '', tamano: '', fecha: '', hora: '', usuario: '', tipo: '', estado: '', descripcion: '', id_carpeta: '',
          id: 0
        }); 
      });
    }
  }


  abrirArchivo(archivo: Maestro):void {
    const url = this.getGoogleDriveUrl(archivo.ruta);
    window.open(url, '_blank');
  }


  getGoogleDriveUrl(ruta: string): string {
    return `https://drive.google.com/uc?export=view&id=${ruta}`;
  }



  descargarArchivo(archivo: Maestro): void {

    const url = this.getGoogleDriveUrl(archivo.ruta);

    const link = document.createElement('a');

    link.href = url;
    link.download = archivo.nombre;
    link.target = '_blank';

    link.click();
  }

 //editar archivo
 editarArchivo(archivo: Maestro): void {

  //abrir el dialogo para editar el archivo
  const dialogRef = this.dialog.open(FileDialogComponent, {
    width: '400px',
    data: {nombre: archivo.nombre, id: archivo.id, usuario: this.humaniUser.chrClave}
  });

  //cuando se cierra el dialogo
  dialogRef.afterClosed().subscribe(result => {

    //si no hay error
    if(!result.error){

      //mostrar mensaje de exito
      this.openSnackBar('Archivo actualizado correctamente', '🤟🤩');
      //obtener los archivos del maestro
        this.getDatosUsuario();
        this.getArchivosAdmin();
    }
    else{
      this.openSnackBar('Error al actualizar el archivo', '🤯😈');
    
    }
  });
}


  //Guardar archivos en drive 

  public async guardarArchivosAdmin() {

    for (let file of this.lstFilesAdmin) {

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
