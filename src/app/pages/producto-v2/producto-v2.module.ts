import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductoComponent } from '../producto/pages/list-producto/list-producto.component';
import { RouterModule } from '@angular/router';
import { ProductoV2Routes } from './productoV2.routes';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductoV2Routes)
  ]
})
export class ProductoV2Module { }
