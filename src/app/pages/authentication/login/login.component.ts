import { Component } from '@angular/core';
import { Login } from '../../../interfaces/login';
import { AuthService } from '../../../services/auth.service';
//formulario reactivo
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  loginForm: FormGroup = this.fb.group({
    Email: ['', Validators.required],
    Contrasenia: ['', Validators.required],
  });

  public login = async () => {
  
    
        
        this.router.navigate(['/dashboard']);
      
  }

}

