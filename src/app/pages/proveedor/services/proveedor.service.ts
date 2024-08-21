import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../interfaces/proveedor';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class ProveedorService {

  private URL_PROVEEDORES = `${environment.ENDPOINT_DESKART}api/proveedores`;

  constructor(private http: HttpClient) { }

  // Obtiene todos los proveedores
  public getAllProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.URL_PROVEEDORES}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Inserta un nuevo proveedor
  public insertProveedor(data: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.URL_PROVEEDORES, data)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Obtiene un proveedor por ID
  public getProveedorById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.URL_PROVEEDORES}/${id}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Actualiza un proveedor por ID
  public updateProveedor(id: number, proveedor: Proveedor): Observable<void> {
    return this.http.put<void>(`${this.URL_PROVEEDORES}/${id}`, proveedor)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  // Elimina un proveedor por ID
  public eliminarProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_PROVEEDORES}/eliminar/${id}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

}
