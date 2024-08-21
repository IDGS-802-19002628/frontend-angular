import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Grupo } from '../interfaces/grupos.interface';


@Injectable({
    providedIn: 'root'
})
export class GruposService {

    private URL_INSCRIPCIONES= environment.ENDPOINT_INSCRIPCIONES;
    private URL_GRUPO = environment.ENDPOINT_GRUPO;
    constructor(
        private http: HttpClient
    ) { }

  


    public getGrupos(): Observable<Grupo[]> {
        return this.http.get<Grupo[]>(`${this.URL_GRUPO}grupos`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public insertGrupo(data: any) : Observable<any> {
        return this.http.post(`${this.URL_GRUPO}insertGrupo`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
        
    }
    public getGrupoByClave(chrclave: string) : Observable<Grupo> {
        return this.http.get<Grupo>(`${this.URL_GRUPO}grupos/${chrclave}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }


    public editarGrupo(data: any) : Observable<any> {
        return this.http.post(`${this.URL_GRUPO}updateGrupo`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
        
    }

    public eliminarGrupo(data: any) : Observable<any> {
        return this.http.post(`${this.URL_GRUPO}deleteGrupo`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
        
    }






}

