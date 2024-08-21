import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioControllerService } from '../../controller/usuario.controller';
import { Plantel } from '../../interfaces/plantel';
import { Status } from '../../interfaces/status';

@Component({
  selector: 'app-insert-usuario',
  templateUrl: './insert-usuario.component.html',
  styleUrls: ['./insert-usuario.component.scss']
})
export class InsertUsuarioComponent implements OnInit {

  private lstFiles: any[] = [];
  public isLoading = false;
  public ltsPlantel : Plantel[] = [];
  public ltsStatusUser : Status[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioControllerService: UsuarioControllerService
  ) { }

  public formUsuario = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
    apellidoPaterno: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
    apellidoMaterno: ['',  [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
    domicilio: ['', Validators.required],
    rfc: ['', Validators.required],
    curp: ['', Validators.required],
    correoElectronico: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    telefono: ['', Validators.required],
    plantel: ['', Validators.required],
    status: ['', Validators.required],
    clave: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    //chrArchivoActadenacimiento: ['', Validators.required],
    //chrArchivoCurp: ['', Validators.required],
    //chrArchivoCedulaProfesional: ['', Validators.required],
    //chrArchivoComprobantededomicilio: ['', Validators.required],
    //chrArchivoCartadesituacionfiscal: ['', Validators.required],
    //chrArchivoIne: ['', Validators.required],
    //chrArchivoNss: ['', Validators.required],
    //chrArchivoTitulo: ['', Validators.required],
    //chrArchivoInfonavit: ['', Validators.required],
    //chrArchivoClabeBancaria: ['', Validators.required],
    //chrArchivoFirmaContratoyHorario: ['', Validators.required],
    //chrArchivoCurriculum: ['', Validators.required],

  });


 public async ngOnInit() {

    this.getPlanteles();
    this.getStatusUsuario();

  }

  public insertUsuario() {

    this.isLoading = true;

    

  }
  private async getPlanteles() {
   
    //this.ltsPlantel = await this.usuarioControllerService.getPlanteles();
    
  }

  private async getStatusUsuario() {
    
    //this.ltsStatusUser = await this.usuarioControllerService.getStatusUsuario();
  }


  onFileSelected(event: any, controlName: string) {

    const file: File = event.target.files[0];

    this.lstFiles.push({ file: file, controlName: controlName });
    this.formUsuario.get(controlName)?.setValue(file.name);
  }


  onDragOver(event: DragEvent) {

    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }

  }

  onDrop(event: DragEvent, controlName: string) {
   
    event.preventDefault();
    event.stopPropagation();
   
    const file = event.dataTransfer?.files;
    
    if (file && file.length > 0) {
     
      this.lstFiles.push({ file: file[0], controlName: controlName });
      
      this.formUsuario.get(controlName)?.setValue(file[0].name);
    }

  }


  private openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}






