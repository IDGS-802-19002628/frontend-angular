import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Proveedor } from '../../interfaces/proveedor';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProveedorController } from '../../controller/proveedor.controller';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.scss']
})
export class ListProveedorComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: String[] = ['Nombre', 'Telefono', 'Email','Direccion','Estatus'];
  public dataSource = new MatTableDataSource<Proveedor>([]);
  public Proveedores: Proveedor[] = [];
  public isLoading: boolean = false;

  constructor(
    private fb : FormBuilder,
    private proveedorService: ProveedorService,
    private proveedorController: ProveedorController,
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
    this.router.navigate([`/proveedores/edit-proveedores/${nombre}`]);
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public async getAllProveedor() {
    this.isLoading = true;
    let response = await this.proveedorController.getAllProveedores();
    this.Proveedores = response;
    this.dataSource = new MatTableDataSource(this.Proveedores);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
    
  }

}



