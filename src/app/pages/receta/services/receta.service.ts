import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../producto/interfaces/producto';
import { MateriaP } from '../receta/interfaces/materiaP';
import { Receta } from '../receta/interfaces/receta';
import { RecetaAgrupada } from '../receta/interfaces/receta-agrupada';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = 'https://192.168.68.214:7159/api/Receta';  // URL base del API de recetas
  private productosUrl = 'https://192.168.68.214:7159/api/Productos/GetProductos';
  private materiaPUrl = 'https://192.168.68.214:7159/api/MateriaP/ListaMP';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  getMateriaP(): Observable<MateriaP[]> {
    return this.http.get<MateriaP[]>(this.materiaPUrl);
  }

  registrarReceta(receta: Receta): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-receta`, receta);
  }

  obtenerRecetas(): Observable<RecetaAgrupada[]> {
    return this.http.get<RecetaAgrupada[]>(`${this.apiUrl}/obtener-recetas`);
  }
}
