import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscripcionesService } from '../services/inscripciones.service';
import { Cp, responseCp } from '../interfaces/cp.interfaces';
import { Estado, responseEstados } from '../interfaces/estados.interfaces';
import { Cursos } from '../interfaces/cursos';
import { Escuelas } from '../interfaces/escuelas.interfaces';
import { Turnos } from '../interfaces/turnos.interfaces';
import { Inscripciones } from '../../alumno/interfaces/inscripciones.interfaces';
@Injectable({
    providedIn: 'root',
})
export class inscripcionControllerService {
    constructor(
        private inscripcionesService: InscripcionesService,
        private snackBar: MatSnackBar
    ) { }


    public getEstados(): Promise<Estado[]> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getEstados().subscribe({
                next: (data: responseEstados) => {
                    resolve(data.respuesta.estados);
                },
                error: (error) => {
                    reject(error);
                },
            });
        }
        );
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
 
    public getTurnos(escuela:string): Promise<Turnos[]> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getTurnos(escuela).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los turnos', '🤯😈');
                    reject(error);
                },
            });
        }
        );
    }

    public getCursosByEscuela(escuela: string): Promise<Cursos[]> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getCursosByEscuela(escuela).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los cursos', '🤯😈');
                    reject(error);
                },
            });
        }
        );
    }

    public getDataByCP(cp: string): Promise<Cp[]> {
        return new Promise((resolve) => {
            this.inscripcionesService.getDataByCP(cp).subscribe({
                next: (data: responseCp) => {
                    this.openSnackBar('Información obtenida correctamente', '🤩🥳');
                    resolve(data.respuesta.codigos_postales);
                },
                error: (_) => {
                    this.openSnackBar('Error al obtener la información, ingrese un código postal válido', '🤯😈');
                    let data: Cp[] = [];
                    resolve(data);
                },
            });
        }
        );
    }

    public getInscripcionByClave(clave: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getInscripcionByClave(clave).subscribe({
                next: (data) => {
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener la inscripción', '🤯😈');
                    resolve({} as Inscripciones);
                },
            });
        }
        );
    }

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
