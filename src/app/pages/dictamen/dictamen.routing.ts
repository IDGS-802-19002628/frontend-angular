import { Routes } from '@angular/router';
import { DictamenesComponent } from './dictamenes/dictamenes.component';
import { InsertarDictamenComponent } from './insertar-dictamen/insertar-dictamen.component';
export const DictamenComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DictamenesComponent,
      },
      {
        path: 'insertar-dictamen',
        component: InsertarDictamenComponent,
      },
    ],
  },
];
