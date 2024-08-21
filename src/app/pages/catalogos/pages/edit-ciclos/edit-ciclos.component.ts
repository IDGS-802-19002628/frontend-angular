import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CiclosService } from '../../services/ciclos.service';
import { ciclosControllerService } from '../../controller/ciclos.controller';
import { Ciclo } from '../../interfaces/ciclos.interface';
import {ActivatedRoute, Router } from '@angular/router';
import { getDias, getMonths, getYears } from 'src/app/shared/helpers/helpers';



@Component({
  selector: 'app-edit-ciclos',
  templateUrl: './edit-ciclos.component.html',
  styleUrls: ['./edit-ciclos.component.scss']
})
export class EditCiclosComponent implements OnInit {
  public title: string = 'Editar Ciclo';
  public titlecalificaciones: string ='Fechas Calificaciones';
  public isLinear = false;
  public isLoading: boolean = false;
  public meses: any[] = []; 
  public years: any[] = [];
  public dias: any[] = [];
  public cveCiclo: string = '';


//valida formulario de editar ciclo
  public formeditCiclos = this._formBuilder.group({
    clave:  ['', Validators.required],
    anio:  ['',Validators.required],
    nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+\-=,.?/\\[\\]{}\'"~\\s]*$')]],
    descripcion: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+\-=,.?/\\[\\]{}\'"~\\s]*$')]],
    mesini: ['', Validators.required],
    mesfin: ['', Validators.required],
    corteinimes: ['', Validators.required],
    cortefinmes: ['', Validators.required],
    cortemes1: ['', Validators.required],
    corteinimes2: ['', Validators.required],
    cortefinmes2: ['', Validators.required],
    cortemes2: ['', Validators.required],
    corteinimes3: ['', Validators.required],
    cortefinmes3: ['', Validators.required],
    cortemes3: ['', Validators.required],
    diainiext: ['', Validators.required],
    diafinext: ['', Validators.required],
    mesextra: ['', Validators.required],
    diainicioespecial: ['', Validators.required],
    diafinespecial: ['', Validators.required],
    mesespecial: ['', Validators.required],
    fechaini: ['', Validators.required],
    fechafin: ['', Validators.required]
  });



  constructor(
    private _formBuilder: FormBuilder,
    private cicloService: CiclosService,
    private snackBar: MatSnackBar,
    private cicloControllerService: ciclosControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }


  public async ngOnInit() {
    
      this.getDataByUrl();
      this.meses =  getMonths();
      this.years =  getYears();
      this.dias=getDias();
   
   
  }


  //funcion para traer el id por medio de la url
  public getDataByUrl = async () => {
    this.activatedRoute.params.subscribe(async dataFact => {
      const { id } = dataFact;
      this.cveCiclo = id;
      if(id){
        this.formeditCiclos.get("clave")?.disable();
        await this.getCiclo();
      }
    });
  }


//funcion para buscar los datos correspondiente al ciclo seleccionado y asignar los datos a los campos
  public async getCiclo() {
    this.isLoading = true;
    const response = await this.cicloControllerService.getCicloByClave(this.cveCiclo);
    if (response) {
      let ciclo: Ciclo = response;

      console.log("la respuesta es:", ciclo);
      // this.formEscuelas.patchValue(escuela)
       this.formeditCiclos.get("clave")?.setValue(ciclo.cveCiclo)
       this.formeditCiclos.get("anio")?.setValue(ciclo.intAnio.toString())
       this.formeditCiclos.get("nombre")?.setValue(ciclo.chrNombre)
       this.formeditCiclos.get("descripcion")?.setValue(ciclo.chrDescripcion)
       this.formeditCiclos.get("mesini")?.setValue(ciclo.mesini)
       this.formeditCiclos.get("mesfin")?.setValue(ciclo.mesfin)
       this.formeditCiclos.get("corteinimes")?.setValue(ciclo.corteIniMes1)
       this.formeditCiclos.get("cortefinmes")?.setValue(ciclo.corteFinMes1)
       this.formeditCiclos.get("cortemes1")?.setValue(ciclo.corteMes1)
       this.formeditCiclos.get("corteinimes2")?.setValue(ciclo.corteIniMes2)
       this.formeditCiclos.get("cortefinmes2")?.setValue(ciclo.corteFinMes2)
       this.formeditCiclos.get("cortemes2")?.setValue(ciclo.corteMes2)
       this.formeditCiclos.get("corteinimes3")?.setValue(ciclo.corteIniMes3)
       this.formeditCiclos.get("cortefinmes3")?.setValue(ciclo.corteFinMes3)
       this.formeditCiclos.get("cortemes3")?.setValue(ciclo.corteMes3)
       this.formeditCiclos.get("diainiext")?.setValue(ciclo.diaIniExtra)
       this.formeditCiclos.get("diafinext")?.setValue(ciclo.diaFinExtra)
       this.formeditCiclos.get("mesextra")?.setValue(ciclo.mesExtra)
       this.formeditCiclos.get("diainicioespecial")?.setValue(ciclo.diaIniEspe)
       this.formeditCiclos.get("diafinespecial")?.setValue(ciclo.diaFinEspe)
       this.formeditCiclos.get("mesespecial")?.setValue(ciclo.mesEspe)
       this.formeditCiclos.get("fechaini")?.setValue(ciclo.fechaini)
       this.formeditCiclos.get("fechafin")?.setValue(ciclo.fechafin)
     
    }
    this.isLoading = false;
  }



//funcion para guardar el ciclo en editar
public async editCiclo(){

  this.isLoading = true;

  let data : Ciclo = {
    cveCiclo: this.formeditCiclos.get('clave')?.value??'',
    intAnio: this.formeditCiclos.get('anio')?.value??'',
    chrNombre: this.formeditCiclos.get('nombre')?.value ?? '',
    chrDescripcion: this.formeditCiclos.get('descripcion')?.value ?? '',
    mesini: this.formeditCiclos.get('mesini')?.value ?? '',
    mesfin: this.formeditCiclos.get('mesfin')?.value ?? '',
    corteIniMes1: this.formeditCiclos.get('corteinimes')?.value ?? '',
    corteFinMes1: this.formeditCiclos.get('cortefinmes')?.value ?? '',
    corteMes1: this.formeditCiclos.get('cortemes1')?.value ?? '',
    corteIniMes2: this.formeditCiclos.get('corteinimes2')?.value ?? '',
    corteFinMes2: this.formeditCiclos.get('cortefinmes2')?.value ?? '',
    corteMes2: this.formeditCiclos.get('cortemes2')?.value ?? '',
    corteIniMes3: this.formeditCiclos.get('corteinimes3')?.value ?? '',
    corteFinMes3: this.formeditCiclos.get('cortefinmes3')?.value ?? '',
    corteMes3: this.formeditCiclos.get('cortemes3')?.value ?? '',
    diaIniExtra: this.formeditCiclos.get('diainiext')?.value ?? '',
    diaFinExtra: this.formeditCiclos.get('diafinext')?.value ?? '',
    mesExtra: this.formeditCiclos.get('mesextra')?.value ?? '',
    diaIniEspe: this.formeditCiclos.get('diainicioespecial')?.value ?? '',
    diaFinEspe: this.formeditCiclos.get('diafinespecial')?.value ?? '',
    mesEspe: this.formeditCiclos.get('mesespecial')?.value ?? '',
    fechaini: this.formeditCiclos.get('fechaini')?.value ?? '',
    fechafin: this.formeditCiclos.get('fechafin')?.value ?? '',
    chrStatus: 'activo',

  };


  let sendData = {
    data: data
  };

  this.cicloService.editarCiclo(sendData).subscribe({
    next: (data: any) => {
      this.openSnackBar('Registrado correctamente', '😊👍');
      this.router.navigate(['/catalogos/listado-ciclos']);
      this.isLoading = false;
    },
    error: (error) => {
      this.openSnackBar('Error al realizar el registro', '😈😱');
      this.isLoading = false;
    }
  });

}




  //Funciones para Validaciones de onchange
  public validarFechas(){

   
    let fechaInicio = new Date(this.formeditCiclos.get('fechaini')?.value  ??'')
    let fechaFinal = new Date(this.formeditCiclos.get('fechafin')?.value  ??'')

    if(fechaInicio  > fechaFinal){
      this.openSnackBar('La fecha de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validarmesinicio(){
    
    let mesInicio = new Date(this.formeditCiclos.get('mesini')?.value  ??'')
    let mesFinal = new Date(this.formeditCiclos.get('mesfin')?.value  ??'')

    if(mesInicio  > mesFinal){
      this.openSnackBar('El mes de inicio no puede ser mayor al final', '😠😱');

    }

  }

  
  public validardiaparcial1(){
    
    let diaInicioPar1 = (this.formeditCiclos.get('corteinimes')?.value  ??'')
    let diaFinalPar1 = (this.formeditCiclos.get('cortefinmes')?.value  ??'')

    if(diaInicioPar1  > diaFinalPar1){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaparcial2(){
    
    let diaInicioPar2 = (this.formeditCiclos.get('corteinimes2')?.value  ??'')
    let diaFinalPar2 = (this.formeditCiclos.get('cortefinmes2')?.value  ??'')

    if(diaInicioPar2  > diaFinalPar2){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaparcial3(){
    
    let diaInicioPar3 = (this.formeditCiclos.get('corteinimes3')?.value  ??'')
    let diaFinalPar3 = (this.formeditCiclos.get('cortefinmes3')?.value  ??'')

    if(diaInicioPar3  > diaFinalPar3){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaextra(){
    
    let diaInicioExtra = (this.formeditCiclos.get('diainiext')?.value  ??'')
    let diaFinalExtra = (this.formeditCiclos.get('diafinext')?.value  ??'')

    if(diaInicioExtra  > diaFinalExtra){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaespecial(){
    
    let diaInicioEspecial = (this.formeditCiclos.get('diainicioespecial')?.value  ??'')
    let diaFinalEspecial = (this.formeditCiclos.get('diafinespecial')?.value  ??'')

    console.log("el dia es ", diaInicioEspecial)
    console.log("el dia es ", diaFinalEspecial)


    if(diaInicioEspecial  > diaFinalEspecial){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }


//funcion para cancelar y redirigir a mostrar ciclos
  public cancelarCiclo(){
    this.router.navigate(['/catalogos/listado-ciclos']);
  }

//funcion para las noticificaciones
  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }





}


