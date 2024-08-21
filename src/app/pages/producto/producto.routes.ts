import { Routes } from '@angular/router';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';
import { InsertProductoComponent } from './pages/insert-producto/insert-producto.component';
import { EditProductoComponent } from './pages/edit-producto/edit-producto.component';
import { ProductoServicioComponent } from './pages/producto-servicio/producto-servicio.component';



export const ProductoComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListProductoComponent,
        
        
      },
      {
        path: 'insert-producto',
        component: InsertProductoComponent,
        data: { title: 'insertar Producto' }
      },
      {
        path: 'edit-producto/:id',
        component: EditProductoComponent,
        data: { title: 'edit Producto' }
      },
      {
        path: 'servicio-producto',
        component: ProductoServicioComponent,
        data: { title: 'servicio Producto' }
      },
      {
        path: 'catalogo-producto',
        component: EditProductoComponent,
        data: { title: 'catalogo Producto' }
      },

    ],
  },
];
