import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioEmpleado } from '../interfaces/usuarioE';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
}) 
export class UsuariosEmpleadosService {

     
    private URL_USUARIOS= environment.ENDPOINT_USUARIOS;

    
    constructor(
        private http: HttpClient 
    ) { }

    public getAllUsuariosE() : Observable<UsuarioEmpleado[]>{

        return this.http.get<UsuarioEmpleado[]>(`${this.URL_USUARIOS}getAllUsuarios`)
        .pipe(catchError( err => throwError(() =>  err)) );
    }


    public insertUsuario(data: any): Observable<any>{
        return this.http.post(`${this.URL_USUARIOS}insertUsuario`, data)
        .pipe(catchError( err => throwError(() =>  err)) );
    }

    public updateUsuario(data: any): Observable<any>{
        return this.http.put(`${this.URL_USUARIOS}updateUsuario`, data)
        .pipe(catchError( err => throwError(() =>  err)) );
    }

   
     


}

