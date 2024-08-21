import { Injectable } from "@angular/core";
import { UsuarioService } from '../services/usuario.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Usuario } from "../interfaces/usuario";
import { Plantel } from "../interfaces/plantel";
import { Status } from "../interfaces/status";


@Injectable({
    providedIn: 'root',
})

export class UsuarioControllerService {
    constructor(
        private usuariosService: UsuarioService,
        private snackBar: MatSnackBar
    ) { }

    public getAllUsuarios(): Promise<Usuario[]> {
        return new Promise((resolve, reject) => {
          this.usuariosService.getAllUsuarios().subscribe({
    
            next: (data) => {
              this.openSnackBar('Proveedores obtenidos correctamente', '😎👌');
              resolve(data);
            },
            error: (error) => {
              this.openSnackBar('Error al obtener los proveedores', '🤯😈');
              console.log(error);
              
              reject(error);
            },
          });
        });
      }
    
      public insertUsuario(data: Usuario): Promise<Usuario> {
        return new Promise((resolve, reject) => {
          this.usuariosService.insertUsuario(data).subscribe({
            next: (response: Usuario) => {
              this.openSnackBar('Proveedor creado correctamente', '😎👌');
              resolve(response);
            },
            error: (error) => {
              this.openSnackBar('Error al crear el proveedor', '🤯😈');
              reject(error);
            },
          });
        });
      }
    
      public updateUsuario(id: number, data: Usuario): Promise<void> {
        return new Promise((resolve, reject) => {
          this.usuariosService.updateUsuario(id, data).subscribe({
            next: () => {
              this.openSnackBar('Proveedor actualizado correctamente', '😎👌');
              resolve();
            },
            error: (error) => {
              this.openSnackBar('Error al actualizar el proveedor', '🤯😈');
              reject(error);
            },
          });
        });
      }
    
      public getUsuarioById(id: number): Promise<Usuario> {
        return new Promise((resolve, reject) => {
          this.usuariosService.getUsuarioById(id).subscribe({
            next: (response: Usuario) => {
              resolve(response);
            },
            error: (error) => {
              this.openSnackBar('Error al obtener el usuario', '🤯😈');
              reject(error);
            },
          });
        });
      }
    
      public eliminarUsuario(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
          this.usuariosService.deleteUsuario(id).subscribe({
            next: () => {
              this.openSnackBar('Usuario eliminado correctamente', '😎👌');
              resolve();
            },
            error: (error) => {
              this.openSnackBar('Error al eliminar el usuario', '🤯😈');
              reject(error);
            },
          });
        });
      }

    private openSnackBar(message: string, icon: string) {
        this.snackBar.open(message, icon, {
            duration: 5000
        });
    }
}