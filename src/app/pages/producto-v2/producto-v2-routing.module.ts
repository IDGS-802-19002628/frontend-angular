import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'productosV2', loadChildren: () => import('./producto-v2.module').then(m => m.ProductoV2Module) },
  { path: '', redirectTo: '/productosV2/list-producto', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
