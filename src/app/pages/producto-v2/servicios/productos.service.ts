import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  alto: string;
  largo: string;
  ancho: string;
  precio: string;
  imagen: string;
  inventarioProductoTerminado: any;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'https://localhost:5001/api/Productos/GetProductos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
