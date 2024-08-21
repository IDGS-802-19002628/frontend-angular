import { Routes } from '@angular/router';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
export const InscripcionesComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InscripcionComponent ,
      },
    ],
  },
];
