import { Routes } from '@angular/router';
import { CitasComponent } from './pages/citas/citas.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { PermisosGuard } from 'src/app/guards/permiso.guard';

export const CitasComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'citas',
        component: CitasComponent,
        pathMatch: 'full',
        data: { title: 'Citas' },
        canActivate: [PermisosGuard]
        
      },
      {
        path: 'seguimiento/:id',
        component: SeguimientoComponent,
        pathMatch: 'full',
        data: { title: 'Seguimiento' }
      },

    ],

    
    
  },


];
