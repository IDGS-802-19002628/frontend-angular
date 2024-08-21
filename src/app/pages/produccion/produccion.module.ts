import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProduccionPendienteComponent } from './pages/list-produccion-pendiente/list-produccion-pendiente.component';
import { ListProduccionProcesoComponent } from './pages/list-produccion-proceso/list-produccion-proceso.component';
import { ListProduccionTerminadoComponent } from './pages/list-produccion-terminado/list-produccion-terminado.component';



@NgModule({
  declarations: [
    ListProduccionPendienteComponent,
    ListProduccionProcesoComponent,
    ListProduccionTerminadoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProduccionModule { }
