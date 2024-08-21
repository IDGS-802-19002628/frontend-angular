import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GruposService } from '../services/grupos.service';
import { Grupo } from '../interfaces/grupos.interface';


@Injectable({
    providedIn: 'root',
})
export class GruposControllerService {
    constructor(
        private gruposService: GruposService,
        private snackBar: MatSnackBar
    ) { }


   

    public getGrupos(): Promise<Grupo[]> {
        return new Promise((resolve, reject) => {
            this.gruposService.getGrupos().subscribe({
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

    public getGrupoByClave(chrclave: string): Promise<Grupo> {
        return new Promise((resolve, reject) => {
            this.gruposService.getGrupoByClave(chrclave).subscribe({
                next: (data) => {
                    this.openSnackBar('Grupo obtenido correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener el grupo', '🤯😈');
                    resolve({} as Grupo);
                },
            });
        }
        );
    }

    // public validateNotInUse(clave: string): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //        //agreagr consulta de si el plantel ta en la bd si no ta regresa true si ta regresa false o si da error regresa false
    //     });
    // }

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
