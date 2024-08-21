import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['Nombre', 'Nombre usuario', 'Correo Electronico', 'chrTelefono', 'rol','Estatus'];
  public dataSource = new MatTableDataSource<Usuario>([]); // Inicializar con un array vacío de Usuario
  public isLoading: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public formSearch: FormGroup = this.fb.group({
    search: ['']
  });

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  ngOnInit(): void {
    this.loadUsuarios();
  }

  private loadUsuarios(): void {
    this.isLoading = true;
    this.usuarioService.getAllUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.dataSource.data = data; // Asignamos los datos directamente a la dataSource.
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios', error);
        this.openSnackBar('Error al cargar los usuarios', 'Cerrar');
        this.isLoading = false;
      }
    });
  }

  public consultarUsuario(id: number): void { 
    this.router.navigate([`/usuarios/edit-usuario/${id}`]);
  }

  public doFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }
}
