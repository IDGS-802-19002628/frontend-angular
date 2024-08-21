import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BibliotecaService } from '../../services/biblioteca.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BibliotecasController } from '../../controller/biblioteca.controller';
import { Libro } from "../../interfaces/libro";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-planteles',
  templateUrl: './list-planteles.component.html',
  styleUrls: ['./list-planteles.component.scss']
})
export class ListPlantelesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: String[] = ['Empresa', 'Nombre de usuario', 'Telefono', 'Email', 'status'];
  public dataSource = new MatTableDataSource<Libro>([]);
  public libros: Libro[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb : FormBuilder,
    private bibliotecaService: BibliotecaService,
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



  }



  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getAllLibros(): void {
    this.isLoading = true;
    this.bibliotecaService.getBibliteca().subscribe({
      next: (response) => {
        this.libros = response;
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching libros', error);
        this.snackBack.open('Error al obtener los libros', '🤯😈', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBack.open(message, action, config);
  }

}

