import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioControllerService } from '../../controller/usuario.controller';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {
  public usuarioForm: FormGroup;
  public usuarioId: number;

  constructor(
    private fb: FormBuilder,
    private usuarioController: UsuarioControllerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Validación para 10 dígitos
      direccion: ['', Validators.required],
      rol: ['', Validators.required],
      status: ['', Validators.required],
      // Otros campos adicionales que necesites
    });

    // Obtener el ID del usuario de la URL
    this.usuarioId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('id'));
      this.cargarUsuario();
    });
  }

  private cargarUsuario(): void {
    this.usuarioController.getUsuarioById(this.usuarioId).then((usuario: Usuario) => {
      this.usuarioForm.patchValue({
        nombre: usuario.nombre,
        primerApellido: usuario.primerApellido,
        segundoApellido: usuario.segundoApellido,
        nombreUsuario: usuario.nombreUsuario,
        contrasenia: usuario.contrasenia,
        email: usuario.email,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        rol: usuario.rol,
        fechaRegistro: usuario.fechaRegistro,
        status: usuario.status
        // Otros campos adicionales que necesites
      });
    }).catch(error => {
      this.snackBar.open('Error al cargar el usuario', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  public guardarCambios(): void {
    if (this.usuarioForm.valid) {
      const usuarioActualizado: Usuario = this.usuarioForm.value;
      this.usuarioController.updateUsuario(this.usuarioId, usuarioActualizado).then(() => {
        this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/usuarios']);
      }).catch(error => {
        this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
          duration: 3000,
        });
      });
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  public cancelar(): void {
    // Redirige al usuario a la página de la lista de usuarios
    this.router.navigate(['/usuarios']);
  }

  public eliminar(): void {
    this.usuarioController.eliminarUsuario(this.usuarioId).then(() => {
      this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/usuarios']);
    }).catch(error => {
      this.snackBar.open('Error al eliminar el usuario', 'Cerrar', {
        duration: 3000,
      });
    });
  }
}
