import { Routes } from '@angular/router';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { InsertUsuarioComponent } from './pages/insert-usuario/insert-usuario.component';
import { EditUsuarioComponent } from './pages/edit-usuario/edit-usuario.component';
import { ListProveedorComponent } from '../proveedor/pages/list-proveedor/list-proveedor.component';

export const UsuarioComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListUsuariosComponent,
      },
      {
        path: 'insert-usuario',
        component: InsertUsuarioComponent,
      },
      {
        path: 'edit-usuario/:id',
        component: EditUsuarioComponent,
      },

    ],
  },
];
