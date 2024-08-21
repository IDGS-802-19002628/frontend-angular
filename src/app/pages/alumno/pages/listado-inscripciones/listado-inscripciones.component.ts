import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { getMonths, getYears } from 'src/app/shared/helpers/helpers';
import { Inscripcion } from '../../interfaces/inscripcion.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Inscripciones } from '../../interfaces/inscripciones.interfaces';
import { InscripcionesService } from '../../services/inscripciones.service';
import { inscripcionesControllerService } from '../../controller/inscripcion.controller';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exportFichaInscripcionPDF } from 'src/app/shared/reports/pdf-ficha-inscripcion';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { helperControllerService } from 'src/app/shared/helpers/helper.controller';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss'],
})
export class ListadoInscripcionesComponent implements OnInit , AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  public isLoading: boolean = false;
  public meses: any[] = []; 
  public anios: any[] = [];
  public displayedColumns: string[] = ['select','nombre', 'curp', 'correo', 'telefono', 'plantel', 'curso', 'turno','estatus']; 
  public dataSource = new MatTableDataSource<Inscripciones>([]); 
  private lstInscripciones: Inscripciones[] = [];
  public selection  = new SelectionModel<any>(true, []);  
  public allComplete                       : boolean = false;
  private humaniUser!: User;

  constructor(
    private fb : FormBuilder,
    private inscripcionesService: InscripcionesService,
    private inscripcionController: inscripcionesControllerService,
    private snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private validar : helperControllerService


  ) {}

  public formSearch: FormGroup = this.fb.group({
    year: ['2024',Validators.required],
    month: ['01',Validators.required]
  });

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
    
  }

  public async ngOnInit() {
    this.isLoading = true;
   
    if (! await this.validarPermiso()){
      this.router.navigate(['/']);
      return;
    }
    await this.getDatosUsuario();
    this.meses =  getMonths();
    this.anios =  getYears();
    this.selectDefaultDate();
    this.getInscripciones();

  }

  private  async  validarPermiso() : Promise<boolean> {
    return new Promise(async (resolve) => {
      let permiso =  await this.validar.validarPermisos({permiso: 'inscripcion'});
      resolve(permiso);
    });
  }
  
  private getDatosUsuario() : Promise<void> {
    return new Promise((resolve) => {
    let usuario = sessionStorage.getItem('token');
    if (usuario) {
      this.humaniUser = this.jwtHelper.decodeToken(usuario).data;
    }
    resolve();
    
    });
  }

  public selectDefaultDate() {
    const date = new Date();
    const month = (date.getMonth()+1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const year = date.getFullYear().toString();
    this.formSearch.get('year')?.setValue(year);
    this.formSearch.get('month')?.setValue(month);
  }

  public async getInscripciones() {
    this.isLoading = true;
    const { year, month } = this.formSearch.value;
    let response = await this.inscripcionController.getInscripciones(year, month);
    this.lstInscripciones = response;
    this.dataSource = new MatTableDataSource(this.lstInscripciones);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }


  public async viewPdf() {

    if (this.selection.selected.length == 0) {
      this.openSnackBar('Seleccione al menos un registro', '🤣🤡');
      return;
    }
    
    this.isLoading = true;
    let inscripciones = this.lstInscripciones.filter((inscripcion) => this.selection.selected.includes(inscripcion));
    let nombreCompleto = `${this.humaniUser.chrNombre} ${this.humaniUser.chrPaterno} ${this.humaniUser.chrMaterno}`;
    inscripciones.map(async (inscripcion) => {
      let data = await this.inscripcionController.getInscripcionByClave(inscripcion.chrClave);
      let sendData = {
        data: data
      }
      
        exportFichaInscripcionPDF(sendData.data, nombreCompleto,false);
    });

    this.isLoading = false;
    
  }

  public dataRefresh() {
    this.getInscripciones();
  }

  public consultarInscripcion(id: number) {
    this.router.navigate([`/alumnos/detalle-inscripcion/${id}`]);
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(element => this.selection.select(element));
        this.isAllSelected() ?
        this.allComplete = true :
        this.allComplete = false;
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
        duration: 3000,
    });
}

}
