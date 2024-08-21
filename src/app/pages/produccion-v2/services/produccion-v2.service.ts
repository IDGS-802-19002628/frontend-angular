import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produccion } from '../interfaces/produccion'; // Asegúrate de tener esta interfaz definida
import { Producto } from '../../producto/interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductionV2Service {
  private apiUrl = 'https://192.168.68.214:7159/api/ProduccionV2';  // Cambia esta URL a la correcta
  private productosUrl = 'https://192.168.68.214:7159/api/Productos/GetProductos';  // Cambia esta URL a la correcta

  constructor(private http: HttpClient) {}

  // Crear una nueva producción
  createProduction(production: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-produccion`, production);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  // Obtener todas las producciones
  getProductions(): Observable<Produccion[]> {
    return this.http.get<Produccion[]>(`${this.apiUrl}/listar-producciones`);
  }

  // Iniciar una producción
  startProduction(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/iniciar-produccion/${id}`, {});
  }

  cancelProduction(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cancelar-produccion/${id}`, {});
  }

  // Completar una producción
  completeProduction(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/completar-produccion/${id}`, {});
  }
}
