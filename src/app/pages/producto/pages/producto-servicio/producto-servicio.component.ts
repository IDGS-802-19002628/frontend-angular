import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../interfaces/producto';
import { ProductoController } from '../../controller/producto.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CarritoComponent } from '../carrito/carrito.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-producto-servicio',
  templateUrl: './producto-servicio.component.html',
  styleUrls: ['./producto-servicio.component.scss']
})
export class ProductoServicioComponent implements OnInit {
  public dataSource = new MatTableDataSource<Producto>([]);
  public Producto: Producto[] = [];
  public carrito: Producto[] = []; // Array para almacenar los productos en el carrito
  public isLoading: boolean = false;
  public mostrarCarrito: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoController: ProductoController,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {}

  public formSearch: FormGroup = this.fb.group({
    search: ['']
  });

  ngOnInit(): void {
    this.getAllProducto();
  }

  // Filtrar productos
  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Navegar a la página de edición del producto
  public consultarGrupo(nombre: string) {
    this.router.navigate([`/productos/edit-producto/${nombre}`]);
  }

  verCarrito(): void {
    const dialogRef = this.dialog.open(CarritoComponent, {
      width: '1000px',

      data: this.carrito
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal del carrito se ha cerrado');
    });
  }

  // Obtener todos los productos
  public async getAllProducto() {
    this.isLoading = true;
    try {
      const response = await this.productoController.getAllProducto();
      this.Producto = response;
      this.dataSource = new MatTableDataSource(this.Producto);
    } catch (error) {
      this.snackBar.open('Error al cargar los productos', 'Cerrar', { duration: 3000 });
    } finally {
      this.isLoading = false;
    }
  }

  // Función para agregar productos al carrito
  public agregarAlCarrito(producto: Producto) {
    this.carrito.push(producto);  // Añadir el producto al carrito
    this.snackBar.open(`${producto.nombre} agregado al carrito`, 'Cerrar', { duration: 2000 });
    this.cdr.detectChanges(); // Forzar la actualización de la vista
  }

  // Función para mostrar/ocultar el carrito
  public toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  // Función para remover un producto del carrito
  public removerDelCarrito(index: number) {
    const productoRemovido = this.carrito.splice(index, 1)[0];
    this.snackBar.open(`${productoRemovido.nombre} removido del carrito`, 'Cerrar', { duration: 2000 });
    this.cdr.detectChanges(); // Forzar la actualización de la vista
  }
}
