import { Injectable } from '@angular/core';
import { ProfilesServicesService } from '../services/profiles.services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserGral, UserGralResponse } from '../interfaces/userGral';
import { Archivos } from 'src/app/interfaces/archivos';
import { Maestro } from '../interfaces/maestro';

@Injectable({
  providedIn: 'root'
})
export class ProfilesControllerService {

  constructor(
    private profileLayoutService: ProfilesServicesService,
    private snackBar: MatSnackBar
  ) { }

  public getDataProfiles(clave: string): Promise<UserGral> {
    return new Promise((resolve, reject) => {
      this.profileLayoutService.getDataProfiles(clave).subscribe({
        next: (data: UserGralResponse) => {
          this.openSnackBar('Datos obtenidos correctamente', '🤟🤩');
          resolve(data.data);
        },
        error: (error) => {
          this.openSnackBar('Error al obtener los datos tiste', '🤯😈');
          resolve({} as UserGral);
        },
      });
    }
    );
  }  

  public uploadFile(data : Archivos): Promise<any> {
    return new Promise((resolve, reject) => {
        this.profileLayoutService.uploadFile(data).subscribe({
            next: (data) => {
                this.openSnackBar('Archivo subido correctamente', '🤟🤩');
                resolve(data);
            },
            error: (error) => {
                this.openSnackBar('Error al subir el archivo', '🤯😈');
                resolve({});
            },
        });
    }
    );
}

public getArchivos(clave: string): Promise<Maestro[]> {

  return new Promise((resolve, reject) => {
    this.profileLayoutService.getArchivos(clave).subscribe({
      next: (data) => {
        this.openSnackBar('Archivos obtenidos correctamentee', '🤟🤩');
        resolve(data);
      },
      error: (error) => {
        this.openSnackBar('Error al obtener los archivosss', '🤯😈');
        resolve([]);
      },
    });
})

}


  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
