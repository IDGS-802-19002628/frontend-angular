import { Routes } from '@angular/router';
import { CatalogosLayoutComponent } from './layout/catalogos-layout.component';
import { InsertCiclosComponent } from './pages/insert-ciclos/insert-ciclos.component';
import { ListCiclosComponent } from './pages/list-ciclos/list-ciclos.component';
import { ListEscuelasComponent } from './pages/list-escuelas/list-escuelas.component';
import { InsertEscuelasComponent } from './pages/insert-escuelas/insert-escuelas.component';
import { EditCiclosComponent } from './pages/edit-ciclos/edit-ciclos.component';
import { ListGruposComponent } from './pages/list-grupos/list-grupos.component';
import { InsertGruposComponent } from './pages/insert-grupos/insert-grupos.component';
import { EditGruposComponent } from './pages/edit-grupos/edit-grupos.component';


export const CatalogosComponentsRoutes: Routes = [
  {
    path: '',
    component: CatalogosLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listado-ciclos',
        pathMatch: 'full',
        
      },
      {
        path: 'listado-ciclos',
        component: ListCiclosComponent,
        data: { title: 'Listado Ciclos' }
      },
      {
        path: 'insertar-ciclos',
        component: InsertCiclosComponent,
        data: { title: 'Listado Ciclos' }
      },
      {
        path: 'listado-escuelas',
        component: ListEscuelasComponent,
        data: { title: 'Listado Escuelas' }
      },
      {
        path: 'insertar-escuelas',
        component: InsertEscuelasComponent,
        data: { title: 'Insertar Escuelas' }
      },
      {
        path: 'listado-grupos',
        component: ListGruposComponent,
        data: { title: 'Listado Grupos' }
      },
      {
        path: 'insertar-grupos',
        component: InsertGruposComponent,
        data: { title: 'Insertar Grupos' }
      },

    ],

    
    
  },
  {
    path: 'editar-escuelas/:id',
    component: InsertEscuelasComponent,
    data: { title: 'Detalle Escuelas' }
  },
  {
    path: 'editar-ciclos/:id',
    component: EditCiclosComponent,
    data: { title: 'Detalle Ciclos' }
  },
  {
    path: 'editar-grupos/:id',
    component: EditGruposComponent,
    data: { title: 'Detalle Grupos' }
  },

];
