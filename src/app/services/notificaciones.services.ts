import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Departamento, Notificaciones, NotificacionesInsert, NotificacionesInsertResponse, NotificacionesRequest } from '../interfaces/notificaciones';
import { CorreosRequest } from '../interfaces/correos';


@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {

    private URL_NOTIFICACIONES= environment.ENDPOINT_NOTIFICACIONES;
    private URL_INSCRIPCIONES = environment.ENDPOINT_INSCRIPCIONES;
    constructor(
        private http: HttpClient
    ) { }


    public getNotificaciones($data : any) : Observable<Notificaciones[]> {
        return this.http.post<Notificaciones[]>(`${this.URL_NOTIFICACIONES}getNotificaciones`, $data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public getDepartamentosUsuario(chrClaveUsuario : string) : Observable<Departamento[]> {
        return this.http.get<Departamento[]>(`${this.URL_NOTIFICACIONES}getDepartamentosUsuario/${chrClaveUsuario}`)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public insertNotificacion($data : NotificacionesInsert) : Observable<NotificacionesInsertResponse> {
        let data = {data : $data};
        return this.http.post<NotificacionesInsertResponse>(`${this.URL_NOTIFICACIONES}insertNotificacion`, data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public updateNotificacion($data : any) : Observable<NotificacionesInsertResponse> {
        return this.http.put<NotificacionesInsertResponse>(`${this.URL_NOTIFICACIONES}updateNotificacion`, $data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

    public sendCorreoElectronico($data : CorreosRequest) : Observable<any> {
        return this.http.post<any>(`${this.URL_INSCRIPCIONES}sendCorreoElectronico`, $data)
        .pipe(
            catchError( err => throwError(() =>  err))
        );
    }

}

