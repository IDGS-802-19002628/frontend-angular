import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  fechaActual: Date;
  productosAgrupados: { producto: Producto, cantidad: number }[] = [];

  constructor(
    public dialogRef: MatDialogRef<CarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public carrito: any[],
    private ProductoService: ProductoService,
    private snackBar: MatSnackBar
  ) {
    this.agruparProductos();
    this.fechaActual = new Date();
  }

  private agruparProductos(): void {
    const mapaProductos = new Map<string, { producto: Producto, cantidad: number }>();
  
    for (const producto of this.carrito) {
      if (mapaProductos.has(producto.nombre)) {
        mapaProductos.get(producto.nombre)!.cantidad++;
      } else {
        mapaProductos.set(producto.nombre, { producto, cantidad: 1 });
      }
    }
  
    this.productosAgrupados = Array.from(mapaProductos.values());
  }

  public incrementarCantidad(index: number): void {
    this.productosAgrupados[index].cantidad++;
    this.actualizarCarrito();
  }

  public decrementarCantidad(index: number): void {
    if (this.productosAgrupados[index].cantidad > 1) {
      this.productosAgrupados[index].cantidad--;
      this.actualizarCarrito();
    }
  }

  public eliminarProducto(producto: Producto): void {
    const index = this.carrito.findIndex(p => p.nombre === producto.nombre);
    if (index > -1) {
      this.carrito.splice(index, 1);
    }
    this.agruparProductos();
    this.productosAgrupados = this.productosAgrupados.filter(p => p.cantidad > 0);
    this.actualizarContadorCarrito();
  }
  
  private actualizarContadorCarrito(): void {
    const totalItems = this.carrito.length;
    console.log('Carrito actualizado, total de productos:', totalItems);
  }

  public eliminarTodos(): void {
    this.carrito = [];
    this.agruparProductos();
  }

  private actualizarCarrito(): void {
    this.carrito = [];
    for (const item of this.productosAgrupados) {
      for (let i = 0; i < item.cantidad; i++) {
        this.carrito.push(item.producto);
      }
    }
    this.agruparProductos();
  }

  public comprar(): void {
    this.procesarCompra();
    this.dialogRef.close();
  }
  
  private procesarCompra(): void {
    const actualizaciones = this.productosAgrupados.map(item => {
      const stockActual = item.producto.stock ?? 0;
      const nuevoStock = stockActual - item.cantidad;
    
      const productoActualizado: Partial<Producto> = {
        idProducto: item.producto.idProducto,
        nombre: item.producto.nombre,
        descripcion: item.producto.descripcion,
        precio: item.producto.precio,
        rutaImagen: item.producto.rutaImagen,
        stock: nuevoStock > 0 ? nuevoStock : 0,
        idCategoria: item.producto.idCategoria,
        status: item.producto.status
      };

      return this.ProductoService.actualizarProductoParcial(item.producto.idProducto!, productoActualizado, { responseType: 'text' });
    });

    // Crea un nuevo pedido con la suma total y fecha actual
    const pedidoCrear = {
      idUsuario: 2,  // Ajusta según el usuario actual
      fechaPedido: this.fechaActual,
      total: this.productosAgrupados.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0),
      estado: 'pendiente',
      status: 1
    };

    // Espera a que todas las actualizaciones de productos se completen
    forkJoin(actualizaciones).subscribe({
      next: () => {
        this.ProductoService.insertPedido(pedidoCrear).subscribe({
          next: (pedido) => {
            console.log('Pedido creado:', pedido);

            // Mostrar notificación de éxito
            this.snackBar.open('Compra realizada con éxito!', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });

            // Forzar el refresco de la página
            window.location.reload();
          },
          error: (err) => {
            console.error('Error al crear el pedido:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al actualizar los productos:', err);
      }
    });
  }
}
