// src/app/pages/receta/receta-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecetaFormComponent } from './receta/receta.component';

const routes: Routes = [
  { path: 'receta', component: RecetaFormComponent },
  { path: '', redirectTo: 'receta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetaRoutingModule { }
