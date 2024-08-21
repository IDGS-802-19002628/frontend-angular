
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { getMonths, getYears } from 'src/app/shared/helpers/helpers';
import { Grupo } from '../../interfaces/grupos.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GruposService } from '../../services/grupos.service';
import { GruposControllerService } from '../../controller/grupos.controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-grupos',
  templateUrl: './list-grupos.component.html',
  styleUrls: ['./list-grupos.component.scss']
})
export class ListGruposComponent implements OnInit , AfterViewInit  {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['estatus','clave', 'nombre', 'fechaini', 'fechafin']; 
  public dataSource = new MatTableDataSource<Grupo>([]); 
  private lstGrupos: Grupo[] = [];


  constructor(
    private fb : FormBuilder,
    private gruposService: GruposService,
    private gruposController: GruposControllerService,
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

  public async getGrupos() {
    this.isLoading = true;
    let response = await this.gruposController.getGrupos();
    this.lstGrupos = response;
    this.dataSource = new MatTableDataSource(this.lstGrupos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }

  public async addGrupo(){
   this.router.navigate(['/catalogos/insertar-grupos']);
   
  }


  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //doble click
  public consultarGrupo(id: number) {
    this.router.navigate([`/catalogos/editar-grupos/${id}`]);
  }

  



}

