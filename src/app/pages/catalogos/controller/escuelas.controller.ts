import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EscuelasService } from '../services/escuelas.service';
import { Escuela } from '../interfaces/escuelas.interface';


@Injectable({
    providedIn: 'root',
})
export class EscuelasControllerService {
    constructor(
        private escuelasService: EscuelasService,
        private snackBar: MatSnackBar
    ) { }


   

    public getEscuelas(): Promise<Escuela[]> {
        return new Promise((resolve, reject) => {
            this.escuelasService.getEscuelas().subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener las escuelas', '🤯😈');
                    resolve([]);
                },
            });
        }
        );
    }

    public getEscuelaByClave(chrClave: string): Promise<Escuela> {
        return new Promise((resolve, reject) => {
            this.escuelasService.getEscuelaByClave(chrClave).subscribe({
                next: (data) => {
                    this.openSnackBar('Inscripción obtenida correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener la inscripción', '🤯😈');
                    resolve({} as Escuela);
                },
            });
        }
        );
    }

    public validateNotInUse(clave: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
           //agreagr consulta de si el plantel ta en la bd si no ta regresa true si ta regresa false o si da error regresa false
        });
    }

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
