import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorController } from '../../controller/proveedor.controller';
import { Proveedor } from '../../interfaces/proveedor';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.scss']
})
export class EditProveedorComponent implements OnInit {
  public proveedorForm: FormGroup;
  public proveedorId: number;

  constructor(
    private fb: FormBuilder,
    private proveedorController: ProveedorController,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // Obtener el ID del proveedor de la URL
    this.proveedorId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.proveedorId = Number(params.get('id'));
      console.log('prueba desde el componente', this.proveedorId);
      
      this.cargarProveedor();
    });
  }

  private cargarProveedor(): void {
    this.proveedorController.getProveedorById(this.proveedorId).then((proveedor: Proveedor) => {

      this.proveedorForm.patchValue({
        nombre: proveedor.nombre,
        direccion: proveedor.direccion,
        telefono: proveedor.telefono,
        email: proveedor.email
      });
    }).catch(error => {
      this.snackBar.open('Error al cargar el proveedor', 'Cerrar', {
        duration: 3000,
      });
    });

  }

  public guardarCambios(): void {
    console.log('preuba edit', this.proveedorId);
    
    if (this.proveedorForm.valid) {
      const proveedorActualizado: Proveedor = this.proveedorForm.value;
      this.proveedorController.updateProveedor(this.proveedorId, proveedorActualizado).then(() => {
        this.snackBar.open('Error al actualizar el proveedor ', 'Cerrar', {
          duration: 3000,
        });
       
      }).catch(error => {
        this.snackBar.open('Proveedor actualizado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/proveedores']);
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  public cancelar(): void {
    // Redirige al usuario a la página de proveedores
    this.router.navigate(['/proveedores']);
  }

  public eliminar(): void {
    console.log('preuba edit', this.proveedorId);
    
      this.proveedorController.eliminarProveedor(this.proveedorId).then(() => {
        this.snackBar.open('Proveedor eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        
        this.router.navigate(['/proveedores']);
        
      }).catch(error => {
        this.snackBar.open('Error al eliminar el proveedor', 'Cerrar', {
          duration: 3000,
        });
      });
    
    
  }
}
