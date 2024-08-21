import { Routes } from '@angular/router';
import { ListAlumnoComponent } from './pages/list-alumno/list-alumno.component';
import { InsertAlumnoComponent } from './pages/insert-alumno/insert-alumno.component';
import { ListadoInscripcionesComponent } from './pages/listado-inscripciones/listado-inscripciones.component';
import { AlumnosLayoutComponent } from './layout/alumnos-layout.component';
import { DetalleInscripcionComponent } from './pages/detalle-inscripcion/detalle-inscripcion.component';
import { PermisosGuard } from 'src/app/guards/permiso.guard';

export const AlumnoComponentsRoutes: Routes = [
  {
    path: '',
    component: AlumnosLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listado-alumnos',
        pathMatch: 'full',
        
      },
      {
        path: 'insertar-dictamen',
        component: InsertAlumnoComponent,
        data: { title: 'Insertar Dictamen' },
        canActivate: [PermisosGuard]
      },
      {
        path: 'listado-inscripciones',
        component: ListadoInscripcionesComponent,
        data: { title: 'Listado Inscripciones' },
        canActivate: [PermisosGuard]

      },
      {
        path: 'listado-alumnos',
        component: ListAlumnoComponent,
        data: { title: 'Listado Alumnos' },
        canActivate: [PermisosGuard]

      },

    ],

    
    
  },
  {
    path: 'detalle-inscripcion/:id',
    component: DetalleInscripcionComponent,
    data: { title: 'Detalle Inscripción' },
    canActivate: [PermisosGuard]
  },

];
