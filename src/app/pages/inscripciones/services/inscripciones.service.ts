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


@Injectable({
    providedIn: 'root'
})
export class InscripcionesService {

    private URL_INSCRIPCIONES= environment.ENDPOINT_INSCRIPCIONES;
    private URL_UBICACIONES = environment.ENDPOINT_API_UBICACIONES;
    constructor(
        private http: HttpClient 
    ) { }

    public getDataByCP(cp: string) : Observable<responseCp> {
        return this.http.get<responseCp>(`${this.URL_UBICACIONES}cp/${cp}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getEstados() : Observable<responseEstados> {
        return this.http.get<responseEstados>(`${this.URL_UBICACIONES}estados`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );  
    }

    public getMunicipiosByEstado(estado: string) : Observable<Municipio[]> {
        return this.http.get<Municipio[]>(`${this.URL_UBICACIONES}municipios/${estado}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getCursos(): Observable<Cursos[]> {
        return this.http.get<Cursos[]>(`${this.URL_INSCRIPCIONES}cursos`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }
 
    public getEscuelas() : Observable<Escuelas[]> {
        return this.http.get<Escuelas[]>(`${this.URL_INSCRIPCIONES}escuelas`).pipe( res => res)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getCursosByEscuela(escuela: string) : Observable<Cursos[]> {
        return this.http.get<Cursos[]>(`${this.URL_INSCRIPCIONES}cursos/${escuela}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getTurnos(escuela: string) : Observable<Turnos[]> {
        return this.http.get<Turnos[]>(`${this.URL_INSCRIPCIONES}turnos/${escuela}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public insertInscripcion(data: any) : Observable<any> {
        return this.http.post(`${this.URL_INSCRIPCIONES}inscripcion`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
        
    }

    public getInscripcionByClave(clave: string) : Observable<any> {
        return this.http.get<any>(`${this.URL_INSCRIPCIONES}inscripcion/${clave}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }



}

