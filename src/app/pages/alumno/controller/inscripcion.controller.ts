import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscripcionesService } from '../services/inscripciones.service';
import { Inscripciones } from '../interfaces/inscripciones.interfaces';
import { Inscripcion } from '../interfaces/inscripcion.interface';
import { Archivos, AutorizarArchivo } from 'src/app/interfaces/archivos';
import { ReporteTotalInscripcion } from '../interfaces/reporteTotalInscripcio';
import { ArchivosAlumno, ResponseInsertAlumno, agregarAlumno } from '../interfaces/alumno';
@Injectable({
    providedIn: 'root',
}) 
export class inscripcionesControllerService {
    constructor(
        private inscripcionesService: InscripcionesService,
        private snackBar: MatSnackBar
    ) { }

    public getInscripciones(year: string, month: string): Promise<Inscripciones[]> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getInscripciones(year, month).subscribe({
                next: (data) => {
                    this.openSnackBar('Inscripciones obtenidas correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener las inscripciones', '🤯😈');
                    resolve([]);
                },
            });
        }
        );
    }

    public getInscripcionByClave(clave: string): Promise<Inscripcion> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getInscripcionByClave(clave).subscribe({
                next: (data) => {
                    this.openSnackBar('Inscripción obtenida correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener la inscripción', '🤯😈');
                    resolve({} as Inscripcion);
                },
            });
        }
        );
    }

    public uploadFile(data : Archivos): Promise<any> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.uploadFile(data).subscribe({
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

    public getAlumnosTotales(data: ReporteTotalInscripcion): Promise<number> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getAlumnosTotales(data).subscribe({
                next: (data) => {
                    this.openSnackBar('Alumnos totales obtenidos correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los alumnos totales', '🤯😈');
                    resolve(-1);
                },
            });
        }
        );
    }

    public insertAlumno(data: agregarAlumno): Promise<ResponseInsertAlumno> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.insertAlumno(data).subscribe({
                next: (data) => {
                    this.openSnackBar('Alumno insertado correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al insertar el alumno', '🤯😈');
                    resolve({} as ResponseInsertAlumno);
                },
            });
        }
        );
    }


    public getArchivos(clave: string): Promise<ArchivosAlumno[]> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.getArchivos(clave).subscribe({
                next: (data) => {
                    this.openSnackBar('Archivos obtenidos correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los archivos', '🤯😈');
                    resolve([]);
                },
            });
        }
        );
    }

    //autoriza
    public autorizarArchivo(data: AutorizarArchivo): Promise<any> {
        return new Promise((resolve, reject) => {
            this.inscripcionesService.autorizarArchivo(data).subscribe({
                next: (data) => {
                    this.openSnackBar('Archivo autorizado correctamente', '🤟🤩');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al autorizar el archivo', '🤯😈');
                    resolve({});
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
