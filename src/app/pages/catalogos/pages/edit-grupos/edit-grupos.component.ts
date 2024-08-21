
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GruposService } from '../../services/grupos.service';
import { GruposControllerService } from '../../controller/grupos.controller';
import { Grupo } from '../../interfaces/grupos.interface';
import {ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-grupos',
  templateUrl: './edit-grupos.component.html',
  styleUrls: ['./edit-grupos.component.scss']
})
export class EditGruposComponent implements OnInit {

  public title: string = 'Editar Grupo';
  public isLinear = false;
  public isLoading: boolean = false;
  public meses: any[] = []; 
  public years: any[] = [];
  public dias: any[] = [];
  public chrclave: string = '';


//valida formulario de editar ciclo
  public formeditGrupo = this._formBuilder.group({
    clave:  ['', Validators.required],
    nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+\-=,.?/\\[\\]{}\'"~\\s]*$')]],
    
  });



  constructor(
    private _formBuilder: FormBuilder,
    private gruposService: GruposService,
    private snackBar: MatSnackBar,
    private gruposControllerService: GruposControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }


  public async ngOnInit() {
    
      this.getDataByUrl();
      
  }


  //funcion para traer el id por medio de la url
  public getDataByUrl = async () => {
    this.activatedRoute.params.subscribe(async dataFact => {
      const { id } = dataFact;
      this.chrclave = id;
      if(id){
        this.formeditGrupo.get("clave")?.disable();
        await this.getGrupo();
      }
    });
  }


//funcion para buscar los datos correspondiente al ciclo seleccionado y asignar los datos a los campos
  public async getGrupo() {
    this.isLoading = true;
    const response = await this.gruposControllerService.getGrupoByClave(this.chrclave);
    if (response) {
      let grupo: Grupo = response;

      console.log("la respuesta es:", grupo);
      // this.formEscuelas.patchValue(escuela)
       this.formeditGrupo.get("clave")?.setValue(grupo.chrclave)
       this.formeditGrupo.get("nombre")?.setValue(grupo.chrNombre)
     
    }
    this.isLoading = false;
  }



//funcion para guardar el ciclo en editar
public async editGrupo(){

  this.isLoading = true;

  let data : Grupo = {
    chrclave: this.formeditGrupo.get('clave')?.value??'',
    chrNombre: this.formeditGrupo.get('nombre')?.value??'',
    chrStatus: 'activo',

  };


  let sendData = {
    data: data
  };

  this.gruposService.editarGrupo(sendData).subscribe({
    next: (data: any) => {
      this.openSnackBar('Registrado correctamente', '😊👍');
      this.router.navigate(['/catalogos/listado-grupos']);
      this.isLoading = false;
    },
    error: (error) => {
      this.openSnackBar('Error al realizar el registro', '😈😱');
      this.isLoading = false;
    }
  });

}

//funcion para elimunar el grupo en editar
public async deleteGrupo(){

  this.isLoading = true;

  let datadelete = {
    chrclave: this.formeditGrupo.get('clave')?.value??'',
    chrStatus: 'cancelado',

  };


  let sendData = {
    data: datadelete
  };

  this.gruposService.eliminarGrupo(sendData).subscribe({
    next: (datadelete: any) => {
      this.openSnackBar('Registrado correctamente', '😊👍');
      this.router.navigate(['/catalogos/listado-grupos']);
      this.isLoading = false;
    },
    error: (error) => {
      this.openSnackBar('Error al realizar el registro', '😈😱');
      this.isLoading = false;
    }
  });

}





  

//funcion para cancelar y redirigir a mostrar ciclos
  public cancelarEditGrupo(){
    this.router.navigate(['/catalogos/listado-grupos']);
  }

//funcion para las noticificaciones
  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }





}


