import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { ListProduccionPendienteComponent } from './pages/list-produccion-pendiente/list-produccion-pendiente.component';
import { ProduccionRoutingModule } from './produccion-routing.module';  // Importa el módulo de enrutamiento


@NgModule({
  declarations: [
    ListProduccionPendienteComponent
    // Declara otros componentes si es necesario
  ],
  imports: [
    FormsModule,// Asegúrate de importar FormsModule
    
    CommonModule,
    ProduccionRoutingModule  // Importa el módulo de enrutamiento
  ]
})
export class ProduccionV2Module { }
