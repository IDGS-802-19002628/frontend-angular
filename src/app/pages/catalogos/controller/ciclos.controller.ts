import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiclosService } from '../services/ciclos.service';
import { Ciclo } from '../interfaces/ciclos.interface';
@Injectable({
    providedIn: 'root',
})
export class ciclosControllerService {
    constructor(
        private ciclosService: CiclosService,
        private snackBar: MatSnackBar
    ) { }


   

    public getCiclos(): Promise<Ciclo[]> {
        return new Promise((resolve, reject) => {
            this.ciclosService.getCiclos().subscribe({
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

   
    public getCicloByClave(chrClave: string): Promise<Ciclo> {
        return new Promise((resolve, reject) => {
            this.ciclosService.getCicloByClave(chrClave).subscribe({
                next: (data) => {
                    this.openSnackBar('Ciclo obtenido correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener el ciclo', '🤯😈');
                    resolve({} as Ciclo);
                },
            });
        }
        );
    }

    public getClaveCiclos(): Promise<Ciclo> {
        return new Promise((resolve, reject) => {
            this.ciclosService.getClaveCiclos().subscribe({
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


    



    // public getDataByCP(cp: string): Promise<Cp[]> {
    //     return new Promise((resolve) => {
    //         this.inscripcionesService.getDataByCP(cp).subscribe({
    //             next: (data: responseCp) => {
    //                 this.openSnackBar('Información obtenida correctamente', '🤩🥳');
    //                 resolve(data.respuesta.codigos_postales);
    //             },
    //             error: (_) => {
    //                 this.openSnackBar('Error al obtener la información, ingrese un código postal válido', '🤯😈');
    //                 let data: Cp[] = [];
    //                 resolve(data);
    //             },
    //         });
    //     }
    //     );
    // }

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
