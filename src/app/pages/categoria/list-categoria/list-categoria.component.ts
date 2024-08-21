import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Categoria } from '../interfaces/categoria';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaService } from '../services/services.service';
import { CategoriaController } from '../controller/categoria.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.scss']
})
export class ListCategoriaComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: String[] = ['Nombre','Estatus'];
  public dataSource = new MatTableDataSource<Categoria>([]);
  public Categorias: Categoria[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb : FormBuilder,
    private categoriaService: CategoriaService,
    private categoriaController: CategoriaController,
    private snackBack: MatSnackBar,
    private router: Router
  ){}

  public formSearch: FormGroup = this.fb.group({
    search:['']
  });

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  ngOnInit(): void {

    this.getAllProveedor();

  }

  public consultarGrupo(nombre: string) {
    this.router.navigate([`/categorias/edit-categoria/${nombre}`]);
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public async getAllProveedor() {
    this.isLoading = true;
    let response = await this.categoriaController.getAllCategorias();
    this.Categorias = response;
    this.dataSource = new MatTableDataSource(this.Categorias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
    
  }
}
