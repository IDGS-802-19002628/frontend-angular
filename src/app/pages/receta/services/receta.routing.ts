import { Routes } from '@angular/router';
import { RecetaFormComponent } from '../receta/receta.component';


export const UsuarioComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:  RecetaFormComponent,
      },

    ],
  },
];
