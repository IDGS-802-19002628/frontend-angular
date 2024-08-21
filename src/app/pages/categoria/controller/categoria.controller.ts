import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from '../services/services.service'
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaController {
  constructor(
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar
  ) {}

  public getAllCategorias(): Promise<Categoria[]> {
    return new Promise((resolve, reject) => {
      this.categoriaService.getCategorias().subscribe({
        next: (data) => {
          this.openSnackBar('Categorías obtenidas correctamente', '😎👌');
          resolve(data);
        },
        error: (error) => {
          this.openSnackBar('Error al obtener las categorías', '🤯😈');
          reject(error);
        },
      });
    });
  }

  public getCategoriaById(id: number): Promise<Categoria> {
    return new Promise((resolve, reject) => {
      this.categoriaService.getCategoriaById(id).subscribe({
        next: (data) => {
          this.openSnackBar('Categoría obtenida correctamente', '😎👌');
          resolve(data);
        },
        error: (error) => {
          this.openSnackBar('Error al obtener la categoría', '🤯😈');
          reject(error);
        },
      });
    });
  }

  public insertCategoria(data: Categoria): Promise<Categoria> {
    return new Promise((resolve, reject) => {
      this.categoriaService.createCategoria(data).subscribe({
        next: (response) => {
          this.openSnackBar('Categoría registrada correctamente', '😎👌');
          resolve(response);
        },
        error: (error) => {
          this.openSnackBar('Error al registrar la categoría', '🤯😈');
          reject(error);
        },
      });
    });
  }

  public updateCategoria(id: number, data: Categoria): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoriaService.updateCategoria(id, data).subscribe({
        next: () => {
          this.openSnackBar('Categoría actualizada correctamente', '😎👌');
          resolve();
        },
        error: (error) => {
          this.openSnackBar('Error al actualizar la categoría', '🤯😈');
          reject(error);
        },
      });
    });
  }

  public deleteCategoria(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoriaService.deleteCategoria(id).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
