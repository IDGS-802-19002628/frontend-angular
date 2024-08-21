import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Ciclo } from '../interfaces/ciclos.interface';



@Injectable({
    providedIn: 'root'
})
export class CiclosService {

    private URL_INSCRIPCIONES= environment.ENDPOINT_INSCRIPCIONES;
    private URL_CICLO = environment.ENDPOINT_CICLOS;
    constructor(
        private http: HttpClient
    ) { }

  


    public getCiclos(): Observable<Ciclo[]> {
        return this.http.get<Ciclo[]>(`${this.URL_CICLO}ciclo`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public insertCiclo(data: any) : Observable<any> {
        return this.http.post(`${this.URL_CICLO}insertCiclo`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
        
    }
    public getCicloByClave(chrClave: string) : Observable<Ciclo> {
        return this.http.get<Ciclo>(`${this.URL_CICLO}ciclo/${chrClave}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getClaveCiclos(): Observable<Ciclo> {
        return this.http.get<Ciclo>(`${this.URL_CICLO}getclaveciclo`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public editarCiclo(data: any) : Observable<any> {
        return this.http.post(`${this.URL_CICLO}updateCiclo`, data)
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




}

