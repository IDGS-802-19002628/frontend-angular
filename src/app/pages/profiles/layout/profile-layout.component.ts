import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user';
import { ProfilesControllerService } from '../controller/profiles.controller.service';
import { FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { UserGral, changePassword } from '../interfaces/userGral';
import { max } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ProfilesServicesService } from '../services/profiles.services.service';
import { Archivos } from 'src/app/interfaces/archivos';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styles: [
  ]
})
export class ProfileLayoutComponent implements OnInit {
  private humaniUser!: User;
  public isLoading: boolean = false;
  passwordEnabled: boolean = false;
  mostrarInput: boolean = false;
  contrasenaNueva: string = '';
  lstFiles: any[] = [];


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private jwtHelper: JwtHelperService,
    private profileController: ProfilesControllerService,
    private profileService: ProfilesServicesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private ProfileServicesController: ProfilesControllerService




  ) { }

  userTipoForm = this._formBuilder.group({
    chrNombre: ['', [Validators.required]],
    chrPaterno: ['', [Validators.required]],
    chrMaterno: ['', [Validators.required ]],
    chrDomicilio: ['', [Validators.required]],
    chrRFC: ['', [Validators.required]],
    chrCurp: ['', [Validators.required]],
    chrEmail: ['', [Validators.required]],
    dtFechaNacimiento: ['', [Validators.required]],
    chrTelefono: ['', [Validators.required]],
    chrStatus: ['', [Validators.required]],
    chrClave: ['', [Validators.required]],
    chrPasswordNew: ['', [Validators.required]],
    chrPasswordOld: ['', [Validators.required]]
  });




  public habilitarPassword() {
    this.passwordEnabled = true;
    //limpiar campo de contraseña
    this.userTipoForm.get('chrPasswordNew')?.setValue('');
    this.userTipoForm.get('chrPasswordNew')?.enable();

    if (this.passwordEnabled == true) {
      this.mostrarInput = true;
    }

    //cambiar el placeholder del input de chrPaswordNew
    if (this.passwordEnabled == true) {
      this.contrasenaNueva = 'Nueva contraseña';
    }
  
  } 

  
  public async ngOnInit() {
    await this.getDatosUsuario();
    if (this.humaniUser) {
      switch (this.humaniUser.chrTipoUsuario) {
        case 'usuario':
          this.router.navigate(['/profile/usuario']);
          break;
        case 'maestro':
          this.router.navigate(['/profile/maestro']);
          break;
        case 'alumno':
          this.router.navigate(['/profile/alumno']);
          break;
        default:
          this.logout();
          break;
      }
    }

    await this.getDataProfile();

  }


  private getDatosUsuario(): Promise<void> {
    return new Promise((resolve) => {
      let usuario = sessionStorage.getItem('token');
      if (usuario) {
        this.humaniUser = this.jwtHelper.decodeToken(usuario).data;
      }
      resolve();

    });
  }



  public async getDataProfile() {

    this.isLoading = true;
    const response = await this.profileController.getDataProfiles(this.humaniUser.chrClave)

    if (response) {

      let dataUser: UserGral = response;
      response.chrPasswordNew = "quemirabobo";
      this.userTipoForm.patchValue(dataUser);

      this.userTipoForm.get('chrClave')?.disable();
      this.userTipoForm.get('chrPasswordNew')?.disable();
      this.userTipoForm.get('chrNombre')?.disable();
      this.userTipoForm.get('chrPaterno')?.disable();
      this.userTipoForm.get('chrMaterno')?.disable();
      this.userTipoForm.get('chrDomicilio')?.disable();
      this.userTipoForm.get('chrRFC')?.disable();
      this.userTipoForm.get('chrCurp')?.disable();
      this.userTipoForm.get('chrEmail')?.disable();
      this.userTipoForm.get('dtFechaNacimiento')?.disable();
      this.userTipoForm.get('chrTelefono')?.disable();
      this.userTipoForm.get('chrStatus')?.disable();

    }

    this.isLoading = false;
  }

  public updatePassword() {

    this.isLoading = true;

    let data : changePassword = {
      chrClave: this.humaniUser.chrClave,
      chrPasswordOld: this.userTipoForm.get('chrPasswordOld')?.value ?? '',
      chrPasswordNew: this.userTipoForm.get('chrPasswordNew')?.value ?? ''
    };

    this.profileService.updatePassword(data).subscribe({
      next: (data: any) => {
        this.openSnackBar('Contraseña actualizada correctamente', 'Aceptar');
        this.isLoading = false;
        this.passwordEnabled = false;
        this.userTipoForm.get('chrPasswordNew')?.disable();

        //refrescar la pagina despues del openSnackBar
        window.location.reload();       
      },
      error: (error) => {
        this.openSnackBar('Error al actualizar la contraseña', 'Aceptar');
        this.isLoading = false;

       console.log(error);
      }
    })

  
  }

  public logout() {
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
