import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FichaService } from 'src/app/pages/ficha-admision/services/ficha.service';
import { Cita } from 'src/app/shared/dialogs/cita-dialog/cita-dialog.component';
import { Citas, CitasRequest } from '../../interfaces/citas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { Escuelas } from 'src/app/pages/alumno/interfaces/escuelas.interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { helperControllerService } from 'src/app/shared/helpers/helper.controller';
import { getMonths, getYears } from 'src/app/shared/helpers/helpers';
import { CitaDialogComponentAutorizar } from 'src/app/shared/dialogs/cita-autorizar-dialog/cita-dialog.component';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['chrNombre', 'chrApellidoPaterno', 'chrApellidoMaterno', 'chrCorreoElectronico',  'tipoCita','dtFecha', 'chrObservaciones', 'chrEstatus' ];
  public dataSource = new MatTableDataSource<Citas>([]);
  private lstCitas: Citas[] = [];
  public meses: any[] = []; 
  public anios: any[] = [];
  private humaniUser!: User;
  public lstEscuelas: Escuelas[] = [];
  public isAdmin = false;
  
  constructor(
    private router: Router,
    private fichaService : FichaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private validar: helperControllerService

  ) { }

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
  
    await this.getEscuelas();
    this.selectDefaultEscuela();
    this.getCitas();
    this.validarAdmin();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  public async getCitas() {
    let data : CitasRequest = {
      data: {
        plantel: this.formSearch.get('plantel')?.value,
        departamento: "3",
        month: this.formSearch.get('month')?.value,
        year: this.formSearch.get('year')?.value
      }
    }
    this.isLoading = true;

    this.fichaService.consultarCitasPorPlantelYDepartamentoYmesYanio(data).subscribe({
      next: (res) => {
        this.lstCitas = res.data;
        this.lstCitas.map((cita) => {
          cita.dtFecha = new Date(cita.dtFecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
          return cita;
        });

        this.dataSource = new MatTableDataSource(this.lstCitas);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.lstCitas = [];
        this.dataSource = new MatTableDataSource(this.lstCitas);
        
        this.snackBar.open('Error al consultar las citas', '😣🤐', {
          duration: 5000
        });
      }
    });

  }

  public dataRefresh = () => {
    this.getCitas();
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  public AutorizarCalificarCita = (cita: Citas) => {
    this.openDialog(cita);
  }

  private openDialog = (cita: Citas) => {
    const dialogRef = this.dialog.open(CitaDialogComponentAutorizar, {
      width: '600px',
      data: {cita, usuario: this.humaniUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCitas();
      }
    });
  }






}
