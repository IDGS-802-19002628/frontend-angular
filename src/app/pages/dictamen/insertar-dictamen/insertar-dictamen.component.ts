import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Planeacion } from '../interfaces/planeacion';

@Component({
  selector: 'app-insertar-dictamen',
  templateUrl: './insertar-dictamen.component.html'
})
export class InsertarDictamenComponent implements OnInit {

  public isLoading = false;

  constructor(private fb: FormBuilder) { }
/*
Patrón: 	
Registro patronal (principal): 	Estructura con 11 dígitos 
Registros patronales adicionales: 	Le puedes poner una pregunta si cuenta con más registros patronales  si es si: que me habilite para seguir capturando, tengo empresas que tienen hasta 250 registros
RFC:	
Domicilio fiscal:	
Actividad o giro:	
Régimen fiscal:	Persona Moral o Persona Física
Tipo de acto de fiscalización:	Revisión Interna de Dictamen o
Carta Invitación 
Número de folio:	1117ROE20230002 (esa es la estructura solo cambia lo que está a color)
Contenido en el oficio número:	11.91.05.95.0100/DICT/2023/0408 (esa es la estructura solo cambia lo que está a color)
Fecha del oficio:	
Fecha de inicio:	Inicia cuando se notifica el oficio de DIR-01
Fecha de Término:	(normado) 5 meses y (Legal) 6 meses
Período(s) a revisar:	01 de Enero de 2020 al 31 de diciembre de 2020
				
 */
  public formDictamen: FormGroup = this.fb.group({
    patron: ['', Validators.required],
    registroPatronal: ['', Validators.required],
    registrosPatronales: ['', Validators.required],
    rfc: ['', Validators.required], 
    domicilioFiscal: ['', Validators.required],
    actividad: ['', Validators.required],
    regimenFiscal: ['', Validators.required],
    tipoActoFiscalizacion: ['', Validators.required],
    numeroFolio: ['', Validators.required],
    contenidoOficio: ['', Validators.required],
    fechaOficio: ['', Validators.required],
    fechaInicio: [''],
    fechaTermino: [''],
    periodoRevisar: ['', Validators.required]    
  });

  ngOnInit(): void {

  }

  onSubmit(): void {

  }
}
