import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { navItemsAdmistrador } from '../layouts/full/sidebar/sidebar-data';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
  private lstPermisos: string[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.getPermisos().then(() => {
      const url = state.url;  // Obtener la URL actual desde el estado de la ruta
      console.log('URL:', url);
      const permisos = navItemsAdmistrador.find((item) => item.route === url)?.permisos;

     
        return true;
      
    }).catch(() => {
      // En caso de error al obtener permisos, redirigir a una página de error
      this.router.navigate(['/error']);
      return false;
    });
  }

  private getPermisos(): Promise<void> {
    return new Promise((resolve, reject) => {
      
    });
  }
}
