import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Planeacion } from '../interfaces/planeacion';
import { RegistroPatronal } from '../interfaces/registroPatronal';
import { ActoDeRevision } from '../interfaces/actoDeRevision';
import { DictamenService } from '../../../services/dictamen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dictamenes',
  templateUrl: './dictamenes.component.html',
})
export class DictamenesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['No.', 'clave', 'patron', 'rfc', 'fechaDelOficio', 'estatus', 'acciones'];
  public dataSource = new MatTableDataSource<Planeacion>([]); // Inicializar con un array vacío de Planeacion
  public isLoading = false;
  public anios = [2021, 2022, 2023, 2024, 2025];
  public estatus = ['En proceso', 'Concluido', 'Cancelado'];
  constructor(
    private dictamenService: DictamenService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }
   

  public formSearch: FormGroup = this.formBuilder.group({
    anio: ['',Validators.required],
    estatus: ['',Validators.required]
  });



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
    this.getAllPlaneacion();
  }

  private async getAllPlaneacion(): Promise<void> {
    this.isLoading = true;
    this.dictamenService.getAllPlaneacion().subscribe(
      (response: any) => {
        const planeaciones: Planeacion[] = response;
        this.dataSource.data = planeaciones;
        this.openSnackBar('Datos cargados correctamente 😊', 'Cerrar');
        this.isLoading = false;
      },
      (error) => {
        this.openSnackBar('Error al cargar los datos 😞', 'Cerrar');
        this.isLoading = false;
      }
    );
  }
  public addDictamen(): void {
    this.openSnackBar('Funcionalidad no disponible', 'Cerrar');
  }

  public doFilter = (event: Event): void => {
    const value = (event.target as HTMLInputElement).value;

    this.dataSource.filter = value.trim().toLowerCase();
  }

  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }



}
