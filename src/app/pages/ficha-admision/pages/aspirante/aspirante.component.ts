import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FichaControllerService } from '../../controller/ficha.controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionesService } from 'src/app/services/notificaciones.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { helperControllerService } from 'src/app/shared/helpers/helper.controller';
import { User } from 'src/app/interfaces/user';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Ficha } from '../../interfaces/ficha';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FichasRequestConsultar } from '../../interfaces/fichas';
import { getMonths, getYears } from 'src/app/shared/helpers/helpers';
import { Escuelas } from 'src/app/pages/inscripciones/interfaces/escuelas.interfaces';
import {CitaDialogComponent} from '../../../../shared/dialogs/cita-dialog/cita-dialog.component';
@Component({
  selector: 'app-aspirante',
  templateUrl: './aspirante.component.html',
  styleUrls: ['./aspirante.component.scss']
})
export class AspiranteComponent implements OnInit , AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  public isLoading: boolean = false;
  public meses: any[] = []; 
  public anios: any[] = [];
  public displayedColumns: string[] = ['no' ,'chrNombre', 'chrCorreoElectronico', 'chrGenero', 'chrDireccion', 'chrPreparatoriaEgreso', 'chrLicenciaturaInteres', 'chrComoConocio', 'progreso', 'chrEstatus' ];
  public dataSource = new MatTableDataSource<Ficha>([]); 
  private lstFicha: Ficha[] = [];
  public selection  = new SelectionModel<any>(true, []);  
  public allComplete                       : boolean = false;
  private humaniUser!: User;
  public lstEscuelas: Escuelas[] = [];
  public isAdmin = false;
  constructor(
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private validar : helperControllerService,
    private fichaController: FichaControllerService,
    private sharedService: NotificacionesService,
    public dialog: MatDialog

  ) {}

  public formSearch: FormGroup = this.fb.group({
    year: ['2024',Validators.required],
    month: ['01',Validators.required],
    plantel: ['',Validators.required]
  });

  async ngOnInit() {
    await this.getDatosUsuario();
    this.meses =  getMonths();
    this.anios =  getYears();
    this.selectDefaultDate();
    this.getFichas();
    await this.getEscuelas();
    this.selectDefaultEscuela();
    this.validarAdmin();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource._updateChangeSubscription();
    
  }
  private  async  validarAdmin() : Promise<void> {
    return new Promise(async () => {
      let permiso =  await this.validar.validarPermisos({permiso: 'administrador'});
      if (permiso) {
        this.isAdmin = true;
        this.formSearch.get('plantel')?.enable();
      } else {
        this.isAdmin = false;
        this.formSearch.get('plantel')?.setValue(this.humaniUser.chrClaveEscuela);
        this.formSearch.get('plantel')?.disable();
      }
    });
  }

  private async getEscuelas() {
    this.lstEscuelas = await this.validar.getEscuelas();
   }

    public selectDefaultEscuela() {
      this.formSearch.get('plantel')?.setValue(this.humaniUser.chrClaveEscuela);
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

  public async getFichas(): Promise<void> {
    return new Promise((resolve, reject) => {
      let plantel = this.formSearch.get('plantel')?.value ? this.formSearch.get('plantel')?.value : this.humaniUser.chrClaveEscuela;
      let data : FichasRequestConsultar = {
        data : {
          year: this.formSearch.get('year')?.value,
          month: this.formSearch.get('month')?.value,
          plantel: plantel
        }
      }
      this.fichaController.getFichas(data).then((data) => {
        data.data.map((ficha) => {
          ficha.chrNombre = `${ficha.chrNombre} ${ficha.chrApellidoPaterno} ${ficha.chrApellidoMaterno}`;
          return ficha;
        });
        this.lstFicha = data.data;
        this.dataSource = new MatTableDataSource(this.lstFicha);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        resolve();
      }, (error) => {
        this.isLoading = false;
        reject();
      });
    });
  }


  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public dataRefresh() {
    this.getFichas();
  }

  getProgressColor(progres: string): string {
    const progress = parseInt(progres);
    if (progress === 25) {
      return 'warn';
    } else if (progress === 50) {
      return 'accent';
    } else if (progress === 75) {
      return 'primary';
    } else {
      return 'primary';  // Puedes definir un color por defecto aquí
    }
  }

  //agendar cita

  public agendarCita(ficha: Ficha) {
    const dialogRef = this.dialog.open(CitaDialogComponent, {
      width: '500px',
      data: {usuario: ficha.chrClave, tipoCita: 'entrevista', nombre: ficha.chrNombre ,correo: ficha.chrCorreoElectronico}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getFichas();
      }
    });

  }



}
