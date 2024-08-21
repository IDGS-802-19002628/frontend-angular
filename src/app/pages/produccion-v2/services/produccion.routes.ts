import { Routes } from '@angular/router';
import { ListProduccionPendienteComponent } from '../pages/list-produccion-pendiente/list-produccion-pendiente.component';



export const ProduccionComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListProduccionPendienteComponent
      },

    ],
  },
];