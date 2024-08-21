import { Routes } from '@angular/router';
import  {FormularioComponent} from './pages/formulario/formulario.component';
import { PagoComponent } from './pages/pago/pago.component';
import {AspiranteComponent} from './pages/aspirante/aspirante.component';
export const FichaComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FormularioComponent,
        pathMatch: 'full',
        
      },
      {
        path: 'pago/:referencia',
        component: PagoComponent,
        pathMatch: 'full',
      },
      {
        path: 'aspirante',
        component: AspiranteComponent,
        pathMatch: 'full',
        data: { title: 'Listado Aspirantes' }

      },

        
    ]
  },

];
