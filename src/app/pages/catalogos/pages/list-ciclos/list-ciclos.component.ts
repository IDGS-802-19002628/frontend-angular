
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { getMonths, getYears } from 'src/app/shared/helpers/helpers';
import { Ciclo } from '../../interfaces/ciclos.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CiclosService } from '../../services/ciclos.service';
import { ciclosControllerService } from '../../controller/ciclos.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ciclos',
  templateUrl: './list-ciclos.component.html',
  styleUrls: ['./list-ciclos.component.scss']
})
export class ListCiclosComponent implements OnInit , AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['estatus','clave', 'nombre', 'fechaini', 'fechafin']; 
  public dataSource = new MatTableDataSource<Ciclo>([]); 
  private lstCiclos: Ciclo[] = [];

  constructor(
    private fb : FormBuilder,
    private ciclosService: CiclosService,
    private ciclosController: ciclosControllerService,
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

  public async getCiclos() {
    this.isLoading = true;
    let response = await this.ciclosController.getCiclos();
    this.lstCiclos = response;
    this.dataSource = new MatTableDataSource(this.lstCiclos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }


  // public async viewPdf(inscripcion: Inscripciones) {
  //   this.isLoading = true;
  //   console.log(inscripcion);
  //   this.isLoading = false;
  // }

  public async addCiclo(){
    this.router.navigate(['/catalogos/insertar-ciclos']);
  }


  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //doble click
  public consultarCiclo(id: number) {
    this.router.navigate([`/catalogos/editar-ciclos/${id}`]);
  }

  



}
