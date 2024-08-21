import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Proveedor } from '../../interfaces/proveedor';

@Component({
  selector: 'app-insert-proveedor',
  templateUrl: './insert-proveedor.component.html',
  styleUrls: ['./insert-proveedor.component.scss']
})
export class InsertProveedorComponent {

  insertProveedorForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private proveedorService: ProveedorService,
              private snackBar: MatSnackBar) {
    this.insertProveedorForm = this.fb.group({
      
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Validación para solo números
      email: ['', [Validators.required, Validators.email]],
      direccion: ['']
    });
  }
  onSubmit() {
    if (this.insertProveedorForm.valid) {
      const proveedor: Proveedor = this.insertProveedorForm.value;
      this.proveedorService.insertProveedor(proveedor).subscribe({
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
 
    this.router.navigate(['/proveedores']);
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
