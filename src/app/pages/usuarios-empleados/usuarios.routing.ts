import { Routes } from '@angular/router';
import { ListUsuariosEComponent } from './pages/list-usuarios-e/list-usuarios-e.component';
import { InsertUsuariosEComponent } from './pages/insert-usuarios-e/insert-usuarios-e.component';
import { EditUsuariosEComponent } from './pages/edit-usuarios-e/edit-usuarios-e.component';


export const UsuarioComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component:  ListUsuariosEComponent,
      },
      {
        path: 'insert-usuario',
        component: InsertUsuariosEComponent,
      },
      {
        path: 'edit-usuario',
        component: EditUsuariosEComponent,
      },

    ],
  },
];
