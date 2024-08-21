import { Routes } from '@angular/router';
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component';
import { InsertProveedorComponent } from './pages/insert-proveedor/insert-proveedor.component';
import { EditProveedorComponent } from './pages/edit-proveedor/edit-proveedor.component';
import { ListUsuariosComponent } from '../usuarios/pages/list-usuarios/list-usuarios.component';


export const ProveedorComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListProveedorComponent
      },
      {
        path: 'insertar-proveedores',
        component: InsertProveedorComponent,
        data: { title: 'insertar proveedor' }
      },
      {
        path: 'edit-proveedores/:id',  // Acepta el parámetro nombre
        component: EditProveedorComponent,
        data: { title: 'edit proveedor' }
      },

    ],
  },
];
