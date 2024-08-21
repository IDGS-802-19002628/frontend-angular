import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
 // Asegúrate de que la ruta sea correcta
import { Categoria } from '../interfaces/categoria'; // Asegúrate de que la ruta sea correcta
import { CategoriaController } from '../controller/categoria.controller';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.scss']
})
export class EditCategoriaComponent implements OnInit {
  public categoriaForm: FormGroup;
  public categoriaId: number;

  constructor(
    private fb: FormBuilder,
    private CategoriaController: CategoriaController,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      status: [1, Validators.required]  // Establecer el estado por defecto a 1
    });

    // Obtener el ID de la categoría de la URL
    this.categoriaId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoriaId = Number(params.get('id'));
      console.log('ID de la categoría desde el componente:', this.categoriaId);
      this.cargarCategoria();
    });
  }

  private cargarCategoria(): void {
    this.CategoriaController.getCategoriaById(this.categoriaId).then((categoria: Categoria) => {
      this.categoriaForm.patchValue({
        nombre: categoria.nombre,
        status: categoria.status
      });
    }).catch(error => {
      this.snackBar.open('Error al cargar la categoría', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  public guardarCambios(): void {
    if (this.categoriaForm.valid) {
      const categoriaActualizada: Categoria = this.categoriaForm.value;
      this.CategoriaController.updateCategoria(this.categoriaId, categoriaActualizada).then(() => {
        this.snackBar.open('Error al actualizar la categoría', 'Cerrar', {
          duration: 3000,
        });
       
      }).catch(error => {
        this.snackBar.open(' Categoría actualizada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/categorias']);
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  public cancelar(): void {
    this.router.navigate(['/categorias']);
  }

  public eliminar(): void {
    this.CategoriaController.deleteCategoria(this.categoriaId).then(() => {
      this.snackBar.open('Categoría eliminada correctamente', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/categorias']);
    }).catch(error => {
      this.snackBar.open('Error al eliminar la categoría', 'Cerrar', {
        duration: 3000,
      });
    });
  }

}
