import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProduccionPendienteComponent } from './pages/list-produccion-pendiente/list-produccion-pendiente.component';
import { FormsModule } from '@angular/forms';
// Importa otros componentes según sea necesario

const routes: Routes = [
  { path: 'pendiente', component: ListProduccionPendienteComponent },
  // Agrega rutas para otros componentes si es necesario
  { path: '', redirectTo: 'pendiente', pathMatch: 'full' },  // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    FormsModule 
  ],
  exports: [RouterModule]

})
export class ProduccionRoutingModule { }
