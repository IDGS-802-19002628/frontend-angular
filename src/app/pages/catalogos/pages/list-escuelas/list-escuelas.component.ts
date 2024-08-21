
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { getMonths, getYears } from 'src/app/shared/helpers/helpers';
import { Escuela } from '../../interfaces/escuelas.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EscuelasService } from '../../services/escuelas.service';
import { EscuelasControllerService } from '../../controller/escuelas.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-escuelas',
  templateUrl: './list-escuelas.component.html',
  styleUrls: ['./list-escuelas.component.scss']
})
export class ListEscuelasComponent implements OnInit , AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['estatus','clave', 'nombre', 'fechaini', 'fechafin']; 
  public dataSource = new MatTableDataSource<Escuela>([]); 
  private lstEscuelas: Escuela[] = [];

  constructor(
    private fb : FormBuilder,
    private escuelasService: EscuelasService,
    private escuelasController: EscuelasControllerService,
    private router: Router
  ) {}

  public formSearch: FormGroup = this.fb.group({
    year: ['',Validators.required],
    month: ['',Validators.required]
  });

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
  }

  ngOnInit(): void {
   
  }

  private setFechaActual() {
    const fecha = new Date();
    this.formSearch.patchValue({
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1
    });
  }

  public async getEscuelas() {
    this.isLoading = true;
    let response = await this.escuelasController.getEscuelas();
    this.lstEscuelas = response;
    this.dataSource = new MatTableDataSource(this.lstEscuelas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }

  public async addEscuela(){
    this.router.navigate(['/catalogos/insertar-escuelas']);
  }


  // public async viewPdf(inscripcion: Inscripciones) {
  //   this.isLoading = true;
  //   console.log(inscripcion);
  //   this.isLoading = false;
  // }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

//doble click
  public consultarEscuela(id: number) {
    this.router.navigate([`/catalogos/editar-escuelas/${id}`]);
  }

}
