import { Routes } from '@angular/router';
import { ProfileLayoutComponent } from './layout/profile-layout.component';
import { ProfileMaestroComponent } from './pages/profile-maestro/profile-maestro.component';
import { ProfileAlumnoComponent } from './pages/profile-alumno/profile-alumno.component';
import { ProfileAdministrativoComponent } from './pages/profile-administrativo/profile-administrativo.component';


export const ProfileComponentsRoutes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'maestro',
        pathMatch: 'full',
        
      },
      {
        path: 'maestro',
        component: ProfileMaestroComponent,
        data: { title: 'Perfil de maestro' },
      },
      {
        path: 'alumno',
        component: ProfileAlumnoComponent,
        data: { title: 'Perfil de alumno' },
      },

      {
        path: 'usuario',
        component: ProfileAdministrativoComponent,
        data: { title: 'Perfil de administrativo' },
      },


    ],

    
    
  },


];
