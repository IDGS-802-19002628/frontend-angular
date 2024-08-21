// src/app/pages/receta/receta.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RecetaFormComponent } from './receta/receta.component';  // Import the component
import { RecetaRoutingModule } from './receta-routing.module';  // Import routing module

@NgModule({
  declarations: [RecetaFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    RecetaRoutingModule // Import routing module
  ]
})
export class RecetaModule { }
