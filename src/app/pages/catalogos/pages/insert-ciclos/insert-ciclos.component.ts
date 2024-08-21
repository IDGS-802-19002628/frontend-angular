
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CiclosService } from '../../services/ciclos.service';
import { ciclosControllerService } from '../../controller/ciclos.controller';
import { Ciclo } from '../../interfaces/ciclos.interface';
import { Router } from '@angular/router';
import { getDias, getMonths, getYears } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-insert-ciclos',
  templateUrl: './insert-ciclos.component.html',
  styleUrls: ['./insert-ciclos.component.scss']
})
export class InsertCiclosComponent implements OnInit {

  public title: string = 'Nuevo Ciclo';
  public titlecalificaciones: string ='Fechas Calificaciones';
  public isLinear = false;
  public isLoading: boolean = false;
  public meses: any[] = []; 
  public years: any[] = [];
  public dias: any[] = [];
  
  
 



  

 


  public formCiclos = this._formBuilder.group({
    // clave:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
    anio: ['', [Validators.required] ],
    nombre: ['', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9 !@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/?]*$')]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30),  Validators.pattern('^[a-zA-Z0-9 !@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/?]*$')]],
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
    fechafin: ['', Validators.required],
    


  });


  constructor(
    private _formBuilder: FormBuilder,
    private cicloService: CiclosService,
    private snackBar: MatSnackBar,
    private cicloControllerService: ciclosControllerService,
    private router: Router,
   
    
    
  ) { 
    
  }

  ngOnInit(): void {
    
    this.meses =  getMonths();
    this.years =  getYears();
    this.dias=getDias();
    
  
  }

  
  
  public getClaveCiclos(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.isLoading = true;
      let ciclo = await  this.cicloControllerService.getClaveCiclos();
      let clvCiclo=ciclo.cveCiclo;
      let year = this.formCiclos.get('anio')?.value ?? '';
      let yearClave = clvCiclo.slice(0,4)
      let lastDigito = parseInt(clvCiclo.slice (5));
      let setYear =  yearClave;
      if (lastDigito == 1) {
        setYear =  year;
      }
      if (yearClave == setYear) {
       
        lastDigito += 1;
      } 
      console.log(lastDigito);
      let cveCiclo = setYear + "0" + lastDigito;
      resolve (cveCiclo)
    })
  }


  
  

  

   public async saveCiclo() {
   

    this.isLoading = true;
    

    let ciclo = await this.getClaveCiclos();
    let fechaInicio = new Date(this.formCiclos.get('fechaini')?.value  ??'')
    let fechaFinal = new Date(this.formCiclos.get('fechafin')?.value  ??'')
    let mesInicio = new Date(this.formCiclos.get('mesini')?.value  ??'')
    let mesFinal = new Date(this.formCiclos.get('mesfin')?.value  ??'')
    let diaInicioPar1 = (this.formCiclos.get('corteinimes')?.value  ??'')
    let diaFinalPar1 = (this.formCiclos.get('cortefinmes')?.value  ??'')
    let diaInicioPar2 = (this.formCiclos.get('corteinimes2')?.value  ??'')
    let diaFinalPar2 = (this.formCiclos.get('cortefinmes2')?.value  ??'')
    let diaInicioPar3 = (this.formCiclos.get('corteinimes3')?.value  ??'')
    let diaFinalPar3 = (this.formCiclos.get('cortefinmes3')?.value  ??'')
    let diaInicioExtra = (this.formCiclos.get('diainiext')?.value  ??'')
    let diaFinalExtra = (this.formCiclos.get('diafinext')?.value  ??'')
    let diaInicioEspecial = (this.formCiclos.get('diainicioespecial')?.value  ??'')
    let diaFinalEspecial = (this.formCiclos.get('diafinespecial')?.value  ??'')

    

    if(fechaInicio  > fechaFinal){
      this.openSnackBar('La fecha de inicio no puede ser mayor al final', '😠😱');

    }
    if(mesInicio  > mesFinal){
      this.openSnackBar('El mes de inicio no puede ser mayor al final', '😠😱');

    }
    if(diaInicioPar1  > diaFinalPar1){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }
    if(diaInicioPar2  > diaFinalPar2){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }
    
    if(diaInicioPar3  > diaFinalPar3){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }
    if(diaInicioExtra  > diaFinalExtra){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

    if(diaInicioEspecial  > diaFinalEspecial){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

    
    let data : Ciclo = {
      cveCiclo: ciclo,
      intAnio: this.formCiclos.get('anio')?.value??'',
      chrNombre: this.formCiclos.get('nombre')?.value ?? '',
      chrDescripcion: this.formCiclos.get('descripcion')?.value ?? '',
      mesini: this.formCiclos.get('mesini')?.value ?? '',
      mesfin: this.formCiclos.get('mesfin')?.value ?? '',
      corteIniMes1: this.formCiclos.get('corteinimes')?.value ?? '',
      corteFinMes1: this.formCiclos.get('cortefinmes')?.value ?? '',
      corteMes1: this.formCiclos.get('cortemes1')?.value ?? '',
      corteIniMes2: this.formCiclos.get('corteinimes2')?.value ?? '',
      corteFinMes2: this.formCiclos.get('cortefinmes2')?.value ?? '',
      corteMes2: this.formCiclos.get('cortemes2')?.value ?? '',
      corteIniMes3: this.formCiclos.get('corteinimes3')?.value ?? '',
      corteFinMes3: this.formCiclos.get('cortefinmes3')?.value ?? '',
      corteMes3: this.formCiclos.get('cortemes3')?.value ?? '',
      diaIniExtra: this.formCiclos.get('diainiext')?.value ?? '',
      diaFinExtra: this.formCiclos.get('diafinext')?.value ?? '',
      mesExtra: this.formCiclos.get('mesextra')?.value ?? '',
      diaIniEspe: this.formCiclos.get('diainicioespecial')?.value ?? '',
      diaFinEspe: this.formCiclos.get('diafinespecial')?.value ?? '',
      mesEspe: this.formCiclos.get('mesespecial')?.value ?? '',
      fechaini: this.formCiclos.get('fechaini')?.value ?? '',
      fechafin: this.formCiclos.get('fechafin')?.value ?? '',
      chrStatus: 'activo',

    };

    console.log(data);

    let sendData = {
      data: data
    };

    this.cicloService.insertCiclo(sendData).subscribe({
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

  public cancelarCiclo(){
    this.router.navigate(['/catalogos/listado-ciclos']);
  }


  //Validaciones de onchange
  public validarFechas(){

   
    let fechaInicio = new Date(this.formCiclos.get('fechaini')?.value  ??'')
    let fechaFinal = new Date(this.formCiclos.get('fechafin')?.value  ??'')

    if(fechaInicio  > fechaFinal){
      this.openSnackBar('La fecha de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validarmesinicio(){
    
    let mesInicio = new Date(this.formCiclos.get('mesini')?.value  ??'')
    let mesFinal = new Date(this.formCiclos.get('mesfin')?.value  ??'')

    if(mesInicio  > mesFinal){
      this.openSnackBar('El mes de inicio no puede ser mayor al final', '😠😱');

    }

  }

  
  public validardiaparcial1(){
    
    let diaInicioPar1 = (this.formCiclos.get('corteinimes')?.value  ??'')
    let diaFinalPar1 = (this.formCiclos.get('cortefinmes')?.value  ??'')

    if(diaInicioPar1  > diaFinalPar1){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaparcial2(){
    
    let diaInicioPar2 = (this.formCiclos.get('corteinimes2')?.value  ??'')
    let diaFinalPar2 = (this.formCiclos.get('cortefinmes2')?.value  ??'')

    if(diaInicioPar2  > diaFinalPar2){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaparcial3(){
    
    let diaInicioPar3 = (this.formCiclos.get('corteinimes3')?.value  ??'')
    let diaFinalPar3 = (this.formCiclos.get('cortefinmes3')?.value  ??'')

    if(diaInicioPar3  > diaFinalPar3){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaextra(){
    
    let diaInicioExtra = (this.formCiclos.get('diainiext')?.value  ??'')
    let diaFinalExtra = (this.formCiclos.get('diafinext')?.value  ??'')

    if(diaInicioExtra  > diaFinalExtra){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }

  public validardiaespecial(){
    
    let diaInicioEspecial = (this.formCiclos.get('diainicioespecial')?.value  ??'')
    let diaFinalEspecial = (this.formCiclos.get('diafinespecial')?.value  ??'')

    console.log("el dia es ", diaInicioEspecial)
    console.log("el dia es ", diaFinalEspecial)


    if(diaInicioEspecial  > diaFinalEspecial){
      this.openSnackBar('El día de inicio no puede ser mayor al final', '😠😱');

    }

  }






  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }

}
