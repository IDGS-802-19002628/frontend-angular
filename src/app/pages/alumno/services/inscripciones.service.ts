import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Cp, responseCp } from '../interfaces/cp.interfaces';
import { Estado, responseEstados } from '../interfaces/estados.interfaces';
import { Municipio } from '../interfaces/municipio.interfaces';
import { Cursos } from '../interfaces/cursos';
import { Escuelas } from '../interfaces/escuelas.interfaces';
import { Turnos } from '../interfaces/turnos.interfaces';
import { Inscripcion } from '../interfaces/inscripcion.interface';
import { Inscripciones } from '../interfaces/inscripciones.interfaces';
import { Archivos, AutorizarArchivo } from 'src/app/interfaces/archivos';
import { ReporteTotalInscripcion } from '../interfaces/reporteTotalInscripcio';
import { ArchivosAlumno, ResponseInsertAlumno, agregarAlumno } from '../interfaces/alumno';


@Injectable({
    providedIn: 'root' 
})
export class InscripcionesService { 

    private URL_INSCRIPCIONES= environment.ENDPOINT_INSCRIPCIONES;
    private URL_UBICACIONES = environment.ENDPOINT_API_UBICACIONES;
    private URL_VALIDATES = environment.ENDPOINT_VALIDATES;
    private URL_ALUMNOS = environment.ENDPOINT_ALUMNOS;
    constructor(
        private http: HttpClient
    ) { }

    public getInscripciones(year: string, month: string) : Observable<Inscripciones[]> {
        return this.http.get<Inscripciones[]>(`${this.URL_INSCRIPCIONES}inscripciones/${year}/${month}`)
        .pipe(
            catchError( err => throwError(() =>  err)) 
        );
    }

    public   getInscripcionByClave(clave: string) : Observable<Inscripcion> {
        return this.http.get<Inscripcion>(`${this.URL_INSCRIPCIONES}inscripcion/${clave}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public uploadFile(data: Archivos): Observable<any> {
        return this.http.post(`${this.URL_VALIDATES}subirArchivo`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getAlumnosTotales(data: ReporteTotalInscripcion): Observable<number> {
        return this.http.post<number>(`${this.URL_ALUMNOS}totales`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public insertAlumno(data: agregarAlumno): Observable<ResponseInsertAlumno> {
        return this.http.post<ResponseInsertAlumno>(`${this.URL_ALUMNOS}agregar`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getArchivos(clave: string): Observable<ArchivosAlumno[]> {
        return this.http.get<ArchivosAlumno[]>(`${this.URL_ALUMNOS}getArchivos/${clave}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public autorizarArchivo(data: AutorizarArchivo): Observable<any> {
        return this.http.post(`${this.URL_VALIDATES}autorizarArchivo`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }
    


}

    


