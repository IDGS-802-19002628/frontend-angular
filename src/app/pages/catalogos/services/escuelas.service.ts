import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Escuela } from '../interfaces/escuelas.interface';



@Injectable({
    providedIn: 'root'
})
export class EscuelasService {

    private URL_INSCRIPCIONES= environment.ENDPOINT_INSCRIPCIONES;
    private URL_ESCUELA = environment.ENDPOINT_ESCUELA;
    constructor(
        private http: HttpClient
    ) { }

  


    public getEscuelas(): Observable<Escuela[]> {
        return this.http.get<Escuela[]>(`${this.URL_ESCUELA}escuela`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    

    public insertEscuelas(data: any) : Observable<any> {
        return this.http.post(`${this.URL_ESCUELA}insertEscuela`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
        
    }

    public editarEscuelas(data: any) : Observable<any> {
        return this.http.post(`${this.URL_ESCUELA}updateEscuela`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
        
    }

    public getEscuelaByClave(chrClave: string) : Observable<Escuela> {
        return this.http.get<Escuela>(`${this.URL_ESCUELA}escuela/${chrClave}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }




}

