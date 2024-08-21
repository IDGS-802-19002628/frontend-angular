// file-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Archivos, AutorizarArchivo } from 'src/app/interfaces/archivos';
import { User } from 'src/app/interfaces/user';
import { inscripcionesControllerService } from 'src/app/pages/alumno/controller/inscripcion.controller';
import { InscripcionesService } from 'src/app/pages/alumno/services/inscripciones.service';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData {
  nombre: string;
  id: number;
  usuario: string;
}

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss']
})
export class FileDialogComponent implements OnInit {
 public selectedFile: string = '';
  public isLoading: boolean = false;
  public lstPermisos: string[] = [];
  private humaniUser!: User;
  public autoriza : boolean = false;
  constructor(
    public dialogRef: MatDialogRef<FileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private inscripcionesService: InscripcionesService,
    private inscripcionController: InscripcionesService,
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
  ) {}


  
  ngOnInit(): void {
    this.getDatosUsuario();
    this.getPermisos();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    
    //convertirlo a base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result as string;
    };



  }

  private getPermisos(): void {
    this.authService.getPermisosUsuario().subscribe({
      next: (data:any) => {
        this.lstPermisos = data.data;
        this.autoriza = this.lstPermisos.some((permiso: any) => ['inscripcion'].includes(permiso.chrclaveperfil));
      },
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

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Aquí puedes añadir la lógica para subir el archivo seleccionado
    // y enviar los datos actualizados al backend.
    this.isLoading = true;
    if (this.selectedFile) {
      let data : Archivos = {
        data: {
          file: this.selectedFile,
          name: this.data.nombre.replace('chr',''),
          chrClaveUsuario: this.data.usuario,
          estatus: "aceptado",
        }
      }
      this.inscripcionesService.uploadFile(data).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.dialogRef.close({ data: this.data, file: this.selectedFile });
        },
        error: (error) => {
          this.isLoading = false;
          this.dialogRef.close({ data: this.data, file: this.selectedFile, error: error });
        },
      });

      
      
    }
   
  }

  onAutorice(): void {
    this.isLoading = true;
    let data : AutorizarArchivo = {
      data: {
        chrClaveUsuario: this.data.usuario,
        id: this.data.id,
        estatus: "aceptado",
        descripcion: "Archivo aceptado"
      }
    }

    this.inscripcionController.autorizarArchivo(data).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.dialogRef.close({ data: this.data, file: this.selectedFile });
      },
      error: (error) => {
        this.isLoading = false;
        this.dialogRef.close({ data: this.data, file: this.selectedFile, error: error });
      },
    });
  }

  onReject(): void {
    this.isLoading = true;
    let data : AutorizarArchivo = {
      data: {
        chrClaveUsuario: this.data.usuario,
        id: this.data.id,
        estatus: "rechazado",
        descripcion: "Archivo rechazado"
      }
    }

    this.inscripcionController.autorizarArchivo(data).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.dialogRef.close({ data: this.data, file: this.selectedFile });
      },
      error: (error) => {
        this.isLoading = false;
        this.dialogRef.close({ data: this.data, file: this.selectedFile, error: error });
      },
    });
  }
}
