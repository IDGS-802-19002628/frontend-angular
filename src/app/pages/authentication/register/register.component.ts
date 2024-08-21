import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioCController } from '../../usuarios-clientes/controller/usuarioC.controller';
import { UsuarioC } from '../../usuarios-clientes/interfaces/UsuarioC';
import { UsuarioControllerService } from '../../usuarios/controller/usuario.controller';
import { UsuariosClientesService } from '../../usuarios-clientes/services/usuarios-clientes.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      num_ex: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const usuario: UsuarioC = this.registerForm.value;
      this.authService.register(usuario).subscribe({
        next: (response) => {
          // Maneja la respuesta del registro
          
          this.openSnackBar('Error al registrar el usuario: ',  'Cerrar');
        },
        error: (error) => {
          // Manejo del error
          this.openSnackBar('Usuario registrado con éxito', 'Aceptar');
          this.router.navigate(['/authentication/login']); 
          
        }
      });
    }
  }
  
  
  

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
  
}
