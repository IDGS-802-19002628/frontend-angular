import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionesInsert, NotificacionesInsertResponse } from 'src/app/interfaces/notificaciones';
import { Escuelas } from 'src/app/pages/inscripciones/interfaces/escuelas.interfaces';
import { InscripcionesService } from 'src/app/pages/inscripciones/services/inscripciones.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.services';

@Injectable({
  providedIn: 'root',
})
export class helperControllerService {
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private notificaciones: NotificacionesService,
    private inscripcionesService: InscripcionesService,
  ) {}

  public validarPermisos($data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.validarPermisos($data).subscribe({
        next: (data) => {
          resolve(data.data);
        },
        error: (error) => {
          this.openSnackBar(
            'No tienes permisos para realizar esta acción',
            '🤯😈'
          );
          resolve(false);
        },
      });
    });
  }


    public insertNotification($data: NotificacionesInsert): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.notificaciones.insertNotificacion($data).subscribe({
                next: (data) => {
                    this.openSnackBar('Notificación enviada correctamente', '🤟🤩');
                    resolve(true);
                },
                error: (error) => {
                    this.openSnackBar('Error al enviar la notificación', '🤯😈');
                    resolve(false);
                },
            });
        });
    }


    public getEscuelas(): Promise<Escuelas[]> {
      return new Promise((resolve, reject) => {
          this.inscripcionesService.getEscuelas().subscribe({
              next: (data) => {
                  resolve(data);
              },
              error: (error) => {
                  this.openSnackBar('Error al obtener las escuelas', '🤯😈');
                  reject(error);
              },
          });
      }
      );
  } 
  
  decodeBase64ToBlob(base64String: string): Blob {
    // Obtenemos el contenido base64 (sin el encabezado)
    const byteCharacters = atob(base64String);

    // Convertimos los caracteres en un array de bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Creamos un blob con los bytes
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    return blob;
  }


  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


}
