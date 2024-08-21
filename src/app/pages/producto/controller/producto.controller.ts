import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../interfaces/producto';

@Injectable({
    providedIn: 'root',
})
export class ProductoController {
    constructor(
        private productoService: ProductoService,
        private snackBar: MatSnackBar
    ) {}

    public getAllProducto(): Promise<Producto[]> {
        return new Promise((resolve, reject) => {
            this.productoService.getAllProductos().subscribe({
                next: (data) => {
                    this.openSnackBar('Productos obtenidos correctamente', '😎👌');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener los productos', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public getProductoById(id: number): Promise<Producto> {
        return new Promise((resolve, reject) => {
            this.productoService.getProductoById(id).subscribe({
                next: (data) => {
                    this.openSnackBar('Producto obtenido correctamente', '😎👌');
                    resolve(data);
                },
                error: (error) => {
                    this.openSnackBar('Error al obtener el producto', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public insertProducto(data: Producto): Promise<Producto> {
        return new Promise((resolve, reject) => {
            this.productoService.insertProducto(data).subscribe({
                next: (response) => {
                    this.openSnackBar('Producto registrado correctamente', '😎👌');
                    resolve(response);
                },
                error: (error) => {
                    this.openSnackBar('Error al registrar el producto', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public updateProducto(id: number, data: Producto): Promise<void> {
        return new Promise((resolve, reject) => {
            this.productoService.updateProducto(id, data).subscribe({
                next: () => {
                    this.openSnackBar('Producto actualizado correctamente', '😎👌');
                    resolve();
                },
                error: (error) => {
                    this.openSnackBar('Error al actualizar el producto', '🤯😈');
                    reject(error);
                },
            });
        });
    }

    public deleteProducto(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.productoService.deleteProducto(id).subscribe({
                next: () => {
                    this.openSnackBar('Producto eliminado correctamente', '😎👌');
                    resolve();
                },
                error: (error) => {
                    this.openSnackBar('Error al eliminar el producto', '🤯😈');
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
