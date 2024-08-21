import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Libro } from '../interfaces/libro';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private URL_BIBLIOTECA = environment.ENDPOINT_BIBLIOTECAS;
  constructor( private http: HttpClient) { }

public getBibliteca(): Observable<Libro[]> {
      return this.http.get<Libro[]>(`${this.URL_BIBLIOTECA}bibliotecas/libros`).pipe(
        catchError(err => throwError(() => err))
      );
  }

}