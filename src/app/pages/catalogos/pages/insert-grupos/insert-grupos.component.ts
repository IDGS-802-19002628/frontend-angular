
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GruposService } from '../../services/grupos.service';
import { GruposControllerService } from '../../controller/grupos.controller';
import { Grupo } from '../../interfaces/grupos.interface';
import {ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-insert-grupos',
  templateUrl: './insert-grupos.component.html',
  styleUrls: ['./insert-grupos.component.scss']
})
export class InsertGruposComponent implements OnInit {

  public title: string = 'Nuevo Grupo';
  public isLinear = false;
  public isLoading: boolean = false;
  public chrClave: string = '';
  public isEdit : Boolean = false;

  public formGrupos = this._formBuilder.group({
    clave: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
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
    
  }

  public async saveGrupo() {
    this.isLoading = true;
    

    if (this.formGrupos.invalid) {
      this.openSnackBar('Faltan campos por llenar', '😠😱');
      this.isLoading = false;
      return;
    }

    let data : Grupo = {
      chrclave: this.formGrupos.get('clave')?.value??'',
      chrNombre: this.formGrupos.get('nombre')?.value??'',
      chrStatus: 'activo',
    };
    console.log(data)

    let sendData = {
      data: data
    };

    this.gruposService.insertGrupo(sendData).subscribe({
      next: (data: any) => {
        this.openSnackBar('Registrado correctamente', '😊👍');
        this.router.navigate(['/catalogos/listado-grupos']);
        this.isLoading = false;
      },
      error: (error) => {
        this.openSnackBar('Error al guardar la información', '😈😱');
        this.isLoading = false;
      }
    });

  }

  public cancelarGrupo(){
    this.router.navigate(['/catalogos/listado-grupos']);
  }




  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }




 
  

}

