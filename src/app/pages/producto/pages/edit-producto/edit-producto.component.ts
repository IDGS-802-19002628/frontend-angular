import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoController } from '../../controller/producto.controller';
import { Producto } from '../../interfaces/producto';
// Asegúrate de definir esta interfaz para las categorías
import { CategoriaController } from '../../../categoria/controller/categoria.controller';
import { Categoria } from 'src/app/pages/categoria/interfaces/categoria';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss']
})
export class EditProductoComponent implements OnInit {
  public productoForm: FormGroup;
  public productoId: number;
  public categorias: Categoria[] = []; // Para almacenar las categorías disponibles

  constructor(
    private fb: FormBuilder,
    private productoController: ProductoController,
    private categoriaController: CategoriaController,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],  // Validación para precio
      rutaImagen: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Validación para stock
      idCategoria: ['', Validators.required]
    });

    // Obtener el ID del producto de la URL
    this.productoId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productoId = Number(params.get('id'));
      console.log('ID del producto desde el componente:', this.productoId);
      
      this.cargarCategorias(); // Cargar categorías disponibles
      this.cargarProducto();
    });
  }

  private cargarProducto(): void {
    this.productoController.getProductoById(this.productoId).then((producto: Producto) => {
      this.productoForm.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        rutaImagen: producto.rutaImagen,
        stock: producto.stock,
        idCategoria: producto.idCategoria
      });
    }).catch(error => {
      this.snackBar.open('Error al cargar el producto', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  private cargarCategorias(): void {
    this.categoriaController.getAllCategorias().then((categorias: Categoria[]) => {
      this.categorias = categorias;
    }).catch(error => {
      this.snackBar.open('Error al cargar las categorías', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  public guardarCambios(): void {
    console.log('ID del producto para actualización:', this.productoId);
    
    if (this.productoForm.valid) {
      const productoActualizado: Producto = this.productoForm.value;
      this.productoController.updateProducto(this.productoId, productoActualizado).then(() => {
        this.snackBar.open('Error al actualizar el producto ', 'Cerrar', {
          duration: 3000,
        });
        
      }).catch(error => {
        this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/productos']);
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos ', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  public cancelar(): void {
    // Redirige al usuario a la página de productos
    this.router.navigate(['/productos']);
  }

  public eliminar(): void {
    console.log('ID del producto para eliminación:', this.productoId);
    
    this.productoController.deleteProducto(this.productoId).then(() => {
      this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/productos']);
    }).catch(error => {
      this.snackBar.open('Error al eliminar el producto', 'Cerrar', {
        duration: 3000,
      });
    });
  }
}
