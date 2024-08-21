import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseURL = `${environment.ENDPOINT_DESKART}api/categorias`;

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  public getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseURL)
      .pipe(catchError(err => throwError(() => err)));
  }

  // Obtener una categoría por ID
  public getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseURL}/${id}`)
      .pipe(catchError(err => throwError(() => err)));
  }

  // Crear una nueva categoría
  public createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.baseURL, categoria)
      .pipe(catchError(err => throwError(() => err)));
  }

  // Actualizar una categoría existente
  public updateCategoria(id: number, categoria: Categoria): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/${id}`, categoria)
      .pipe(catchError(err => throwError(() => err)));
  }

   // Eliminar una categoría
   public deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/eliminar/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => throwError(() => err)));
  }
}
