import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Producto } from '../../interfaces/producto';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduccionService } from 'src/app/pages/produccion/services/produccion.service';
import { ProductoController } from '../../controller/producto.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.scss']
})
export class ListProductoComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: String[] = ['Nombre', 'Precio', 'Stock', 'Descripcion', 'Estatus'];
  public dataSource = new MatTableDataSource<Producto>([]);
  public Producto: Producto[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb : FormBuilder,
    private produccionService: ProduccionService,
    private productoController: ProductoController,
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

    this.getAllProducto();

  }


  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public consultarGrupo(nombre: string) {
    this.router.navigate([`/productos/edit-producto/${nombre}`]);
  }

  public async getAllProducto() {
    this.isLoading = true;
    let response = await this.productoController.getAllProducto();
    this.Producto = response;
    this.dataSource = new MatTableDataSource(this.Producto);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
    
  }
}
