import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfilesControllerService } from '../controller/profiles.controller.service';
import { UserGral, UserGralResponse } from '../interfaces/userGral';
import { Archivos } from 'src/app/interfaces/archivos';
import { Maestro } from '../interfaces/maestro';

@Injectable({
  providedIn: 'root'
})
export class ProfilesServicesService {

  private URL_PROFILES = environment.ENDPOINT_PROFILES;
  private URL_VALIDATES = environment.ENDPOINT_VALIDATES;
  private URL_ALUMNOS = environment.ENDPOINT_ALUMNOS;
  constructor(
    private http: HttpClient
    
  ) { }

  public getDataProfiles(clave: string): Observable<UserGralResponse> {
    return this.http.get<UserGralResponse>(`${this.URL_PROFILES}getDataProfile/${clave}`)
    .pipe(
      catchError( err => throwError(() =>  err))
    );
  }

  public updatePassword(data: any): Observable<any> {
    return this.http.post(`${this.URL_PROFILES}changePassword`, data)
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

  public getArchivos(clave: string): Observable<Maestro[]>{
    return this.http.get<Maestro[]>(`${this.URL_ALUMNOS}getArchivos/${clave}`)
    .pipe(
      catchError( err => throwError(() =>  err))
    );

  }
  
}
