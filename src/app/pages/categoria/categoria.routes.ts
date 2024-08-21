import { Routes } from '@angular/router';

import { ListCategoriaComponent } from './list-categoria/list-categoria.component';
import { InsertCategoriaComponent } from './insert-categoria/insert-categoria.component';
import { EditCategoriaComponent } from './edit-categoria/edit-categoria.component';



export const CategoriaComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListCategoriaComponent,
        
        
      },
      {
        path: 'insert-categoria',
        component: InsertCategoriaComponent,
        data: { title: 'insertar Categoria' }
      },
      {
        path: 'edit-categoria/:id',
        component: EditCategoriaComponent,
        data: { title: 'edit Categoria' }
      },

    ],
  },
];
