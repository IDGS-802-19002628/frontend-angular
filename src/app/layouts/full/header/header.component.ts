import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,

} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Departamento, Notificaciones, NotificacionesRequest } from 'src/app/interfaces/notificaciones';
import { NotificacionesService } from 'src/app/services/notificaciones.services';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user';
import { Subscription, filter, map, mergeMap } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent  implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  public lstNotificaciones: Notificaciones[] = [];
  public numNotificaciones: number = 0;
  showFiller = false;
  private humaniUser!: User;
  public pageInfo   : string = '';
  public subscriber?: Subscription;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private notificacionesService: NotificacionesService,
    private jwtHelper: JwtHelperService,
    private activatedRoute: ActivatedRoute
  ) {
    this.detectRoute();
  }

  public logout() {
    sessionStorage.removeItem('token');
  
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/authentication/login']).then(() => {
      // Luego recarga la página después de la navegación
      window.location.reload();
    });
  }
  

  public async ngOnInit() {
    await this.getDatosUsuario();
    this.getNotificaciones();
    
    setInterval(() => {
      this.getNotificaciones();
    }, 55000);

  }
  private detectRoute() {
    this.subscriber = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.pageInfo = event['title'];
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

  private updateNotificacion(chrCLave : string) :  Promise<boolean> {
 

    return new Promise((resolve) => {
      let dataSend = {
        data: {
          chrClave: chrCLave
        }
      }

      this.notificacionesService.updateNotificacion(dataSend).subscribe({
        next: (response) => {
          resolve(true);
        },
        error: (error) => {
          resolve(false);
        }
      });
    });
    
  }
  public async marcarLeido(notificacion: Notificaciones) {
    
    let update = await this.updateNotificacion(notificacion.chrClave);
    notificacion.chrStatus = 0;
    this.numNotificaciones = this.lstNotificaciones.filter((notificacion) => notificacion.chrStatus !== 0).length;
    if (notificacion.chrUrl) {
      let contains = notificacion.chrUrl.includes('www.') || notificacion.chrUrl.includes('http') || notificacion.chrUrl.includes('https') ? true : false;
      if (contains) {
        window.open(notificacion.chrUrl, '_blank');
      } else {
      this.router.navigate([notificacion.chrUrl]);
      }
    }
  }

  private getDepartamentosUsuario() : Promise<Departamento[]> {
    return new Promise((resolve) => {
      this.notificacionesService.getDepartamentosUsuario(this.humaniUser.chrClave).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          resolve([]);
        }
      });
      
    });
  }

  public async getNotificaciones() {
      let departamentos = await this.getDepartamentosUsuario();
      let lstDepartamentos: any = [];
      departamentos.map((departamento) => {
        lstDepartamentos.push(departamento.chrClave);
      });

      let data : NotificacionesRequest = {
        chrClaveUsuario: this.humaniUser.chrClave,
        chrClaveDepartamento: lstDepartamentos,
        chrClaveEscuela: this.humaniUser.chrClaveEscuela
      }

      let dataSend = {
        data: data
      }

      this.notificacionesService.getNotificaciones(dataSend).subscribe({
        next: (response) => {
          this.lstNotificaciones = response;
          this.numNotificaciones = this.lstNotificaciones.filter((notificacion) => notificacion.chrStatus != 0).length;
        },
        error: (error) => {
          this.lstNotificaciones = [];
          this.numNotificaciones = 0;
        }
      })
  }
  
}
