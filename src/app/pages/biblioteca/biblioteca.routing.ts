import { Routes } from '@angular/router';

import { ListPlantelesComponent } from './pages/list-planteles/list-planteles.component';
import { BibliotecaLayoutComponent } from './layout/biblioteca-layout.component';

export const LibroComponentsRoutes: Routes = [
  {
    path: '',
    component:ListPlantelesComponent,
    children: [
      {
        path: '',
        redirectTo: 'listado-libros',
        pathMatch: 'full',
        
      }

    ],
  },
];
