
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { EscuelasService } from '../../services/escuelas.service';
import { EscuelasControllerService } from '../../controller/escuelas.controller';
import { Escuelas } from 'src/app/pages/alumno/interfaces/escuelas.interfaces';
import {ActivatedRoute, Router } from '@angular/router';
import { Escuela } from '../../interfaces/escuelas.interface';

@Component({
  selector: 'app-insert-escuelas',
  templateUrl: './insert-escuelas.component.html',
  styleUrls: ['./insert-escuelas.component.scss']
})
export class InsertEscuelasComponent implements OnInit {

  public title: string = 'Nueva Escuela';
  public isLinear = false;
  public isLoading: boolean = false;
  public chrClave: string = '';
  public isEdit : Boolean = false;

  public formEscuelas = this._formBuilder.group({
    chrClave:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')] ],
    direccion: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    descripcion: ['', Validators.required],
    director: ['', Validators.required],

  });


  constructor(
    private _formBuilder: FormBuilder,
    private escuelaService: EscuelasService,
    private snackBar: MatSnackBar,
    private escuelaControllerService: EscuelasControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }


  public async ngOnInit() {
    
     
      
      this.getDataByUrl();
   
    //si ya esta inscrito hay que traernos los archivos
  
  }

  public async saveEscuela() {
    this.isLoading = true;
    

    if (this.formEscuelas.invalid) {
      this.openSnackBar('Faltan campos por llenar', '😠😱');
      this.isLoading = false;
      return;
    }

    // let validateNotInUse = await this.escuelaControllerService.validateNotInUse(this.formEscuelas.get('clave')?.value ?? '');
    
    // if (!validateNotInUse) {
    //   this.openSnackBar('La clave ya está en uso', '😠😱');
    //   this.isLoading = false;
    //   return;
    // }

    let data : Escuelas = {
      chrClave: this.formEscuelas.get('chrClave')?.value??'',
      chrNombre: this.formEscuelas.get('nombre')?.value??'',
      chrDireccion: this.formEscuelas.get('direccion')?.value ?? '',
      chrTelefono: this.formEscuelas.get('telefono')?.value ?? '',
      chrDescripcion: this.formEscuelas.get('descripcion')?.value ?? '',
      chrDirector: this.formEscuelas.get('director')?.value ?? '',
      chrStatus: 'activo',
    };

    let sendData = {
      data: data
    };

    this.escuelaService.insertEscuelas(sendData).subscribe({
      next: (data: any) => {
        this.openSnackBar('Registrado correctamente', '😊👍');
        this.router.navigate(['/catalogos/listado-escuelas']);
        this.isLoading = false;
      },
      error: (error) => {
        this.openSnackBar('Error al realizar la inscripción', '😈😱');
        this.isLoading = false;
      }
    });

  }

  public cancelarEscuela(){
    this.router.navigate(['/catalogos/listado-escuelas']);
  }

public editarEscuela(){
  this.isLoading = true;
    

  if (this.formEscuelas.invalid) {
    this.openSnackBar('Faltan campos por llenar', '😠😱');
    this.isLoading = false;
    return;
  }

  let data : Escuelas = {
    chrClave: this.formEscuelas.get('chrClave')?.value??'',
    chrNombre: this.formEscuelas.get('nombre')?.value??'',
    chrDireccion: this.formEscuelas.get('direccion')?.value ?? '',
    chrTelefono: this.formEscuelas.get('telefono')?.value ?? '',
    chrDescripcion: this.formEscuelas.get('descripcion')?.value ?? '',
    chrDirector: this.formEscuelas.get('director')?.value ?? '',
    chrStatus: 'activo',
  };

  let sendData = {
    data: data
  };
  this.escuelaService.editarEscuelas(sendData).subscribe({
    next: (data: any) => {
      this.openSnackBar('Registrado correctamente', '😊👍');
      this.router.navigate(['/catalogos/listado-escuelas']);
      this.isLoading = false;
    },
    error: (error) => {
      this.openSnackBar('Error al realizar la inscripción', '😈😱');
      this.isLoading = false;
    }
  });



  
}


  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }

  public getDataByUrl = async () => {
    this.activatedRoute.params.subscribe(async dataFact => {
      const { id } = dataFact;
      this.chrClave = id;
      if(id){
        this.isEdit = true;
        this.formEscuelas.get("chrClave")?.disable();
        await this.getEscuela();
      }
    });
  }



  public async getEscuela() {
    this.isLoading = true;
    const response = await this.escuelaControllerService.getEscuelaByClave(this.chrClave);
    if (response) {
      let escuela: Escuela = response;
      this.formEscuelas.patchValue(escuela)
      this.formEscuelas.get("nombre")?.setValue(escuela.chrNombre)
      this.formEscuelas.get("direccion")?.setValue(escuela.chrDireccion)
      this.formEscuelas.get("telefono")?.setValue(escuela.chrTelefono)
      this.formEscuelas.get("descripcion")?.setValue(escuela.chrDescripcion)
      this.formEscuelas.get("director")?.setValue(escuela.chrDirector)

      console.log(escuela)
    }
    this.isLoading = false;
  }
  

}
