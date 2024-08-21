import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL_USUARIOS = environment.ENDPOINT_DESKART;

  constructor(private http: HttpClient) {}

  public getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.URL_USUARIOS}api/usuarios`)
      .pipe(catchError(this.handleError));
  }

  public getUsuarioById(id: number): Observable<Usuario> {
    console.log('prueba', id);
    
    return this.http.get<Usuario>(`http://localhost:5091/api/usuarios/${id}`)
      .pipe(catchError(this.handleError));
  }

  public insertUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.URL_USUARIOS}`, usuario)
      .pipe(catchError(this.handleError));
  }

  public updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.URL_USUARIOS}/${id}`, usuario)
      .pipe(catchError(this.handleError));
  }

  public deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5091/api/usuarios/eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('An error occurred:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
