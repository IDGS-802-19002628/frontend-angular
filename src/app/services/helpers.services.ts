import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class HelpersService {


    private URL_VALIDATES = environment.ENDPOINT_VALIDATES;
    constructor(
        private http: HttpClient
    ) { }


    //GET ALL DEPARTMENTS
    public getDepartamentos(chrClaveUsuario : string) : Observable<any[]> {
        return this.http.get<any[]>(`${this.URL_VALIDATES}getDepartamentos`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }



}

