import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Producto } from '../../interfaces/producto';
import { CategoriaService } from '../../../categoria/services/services.service';
import { Categoria } from '../../../categoria/interfaces/categoria';

@Component({
  selector: 'app-insert-producto',
  templateUrl: './insert-producto.component.html',
  styleUrls: ['./insert-producto.component.scss']
})
export class InsertProductoComponent implements OnInit {

  insertProductoForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private router: Router,
              private fb: FormBuilder,
              private productoService: ProductoService,
              private snackBar: MatSnackBar,
              private categoriaService: CategoriaService) {

    this.insertProductoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]],  // Validación para números con hasta 2 decimales
      rutaImagen: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Validación para solo números
      idCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        this.openSnackBar('Error al cargar las categorías', 'Cerrar');
      }
    });
  }

  onSubmit() {
    if (this.insertProductoForm.valid) {
      const producto: Producto = this.insertProductoForm.value;
      this.productoService.insertProducto(producto).subscribe({
        next: (response) => {
          this.openSnackBar('Producto registrado con éxito', 'Aceptar');
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          this.openSnackBar('Error al registrar el producto', 'Cerrar');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/productos']);
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
