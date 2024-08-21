import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../interfaces/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorController {

  constructor(
    private proveedorService: ProveedorService,
    private snackBar: MatSnackBar
  ) {}

  public getAllProveedores(): Promise<Proveedor[]> {
    return new Promise((resolve, reject) => {
      this.proveedorService.getAllProveedores().subscribe({

        next: (data) => {
          this.openSnackBar('Proveedores obtenidos correctamente', '😎👌');
          resolve(data);
        },
        error: (error) => {
          this.openSnackBar('Error al obtener los proveedores', '🤯😈');
          console.log(error);
          
          reject(error);
        },
      });
    });
  }

  public insertProveedor(data: Proveedor): Promise<Proveedor> {
    return new Promise((resolve, reject) => {
      this.proveedorService.insertProveedor(data).subscribe({
        next: (response: Proveedor) => {
          this.openSnackBar('Proveedor creado correctamente', '😎👌');
          resolve(response);
        },
        error: (error) => {
          this.openSnackBar('Error al crear el proveedor', '🤯😈');
          reject(error);
        },
      });
    });
  }

  public updateProveedor(id: number, data: Proveedor): Promise<void> {
    return new Promise((resolve, reject) => {
      this.proveedorService.updateProveedor(id, data).subscribe({
        next: () => {
          this.openSnackBar('Proveedor actualizado correctamente', '😎👌');
          resolve();
        },
        error: (error) => {
          this.openSnackBar('Error al actualizar el proveedor', '🤯😈');
          reject(error);
        },
      });
    });
  }

  public getProveedorById(id: number): Promise<Proveedor> {
    return new Promise((resolve, reject) => {
      this.proveedorService.getProveedorById(id).subscribe({
        next: (response: Proveedor) => {
          resolve(response);
        },
        error: (error) => {
          this.openSnackBar('Error al obtener el proveedor', '🤯😈');
          reject(error);
        },
      });
    });
  }

  public eliminarProveedor(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.proveedorService.eliminarProveedor(id).subscribe({
        next: () => {
          this.openSnackBar('Proveedor eliminado correctamente', '😎👌');
          resolve();
        },
        error: (error) => {
          this.openSnackBar('Error al eliminar el proveedor', '🤯😈');
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
