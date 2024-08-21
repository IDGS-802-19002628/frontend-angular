import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/services.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Categoria } from '../interfaces/categoria';

@Component({
  selector: 'app-insert-categoria',
  templateUrl: './insert-categoria.component.html',
  styleUrls: ['./insert-categoria.component.scss']
})
export class InsertCategoriaComponent {

  insertCategoriaForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private snackBar: MatSnackBar) {
    this.insertCategoriaForm = this.fb.group({
      
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Validación para solo números
      email: ['', [Validators.required, Validators.email]],
      direccion: ['']
    });
  }
  onSubmit() {
    if (this.insertCategoriaForm.valid) {
      const categoria: Categoria = this.insertCategoriaForm.value;
      this.categoriaService.createCategoria(categoria).subscribe({
        next: (response) => {
          // Maneja la respuesta del registro
          
          
          this.openSnackBar('Usuario registrado con éxito', 'Aceptar');
          this.router.navigate(['/proveedores']); 
        },
        error: (error) => {
          // Manejo del error
          this.openSnackBar('Error al registrar el usuario: ',  'Cerrar');
          
        }
      });
    }
  }

  public cancelar(): void {
 
    this.router.navigate(['/categorias']);
  }
  
  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
