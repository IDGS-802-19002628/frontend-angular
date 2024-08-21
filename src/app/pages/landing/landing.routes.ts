import { Routes } from '@angular/router';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
import { ListProveedorComponent } from '../proveedor/pages/list-proveedor/list-proveedor.component';

export const landingComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingHomeComponent,
      }
    ],
  },
];
