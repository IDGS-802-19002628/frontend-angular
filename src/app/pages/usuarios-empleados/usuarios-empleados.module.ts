import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsuariosEComponent } from './pages/list-usuarios-e/list-usuarios-e.component';
import { InsertUsuariosEComponent } from './pages/insert-usuarios-e/insert-usuarios-e.component';
import { EditUsuariosEComponent } from './pages/edit-usuarios-e/edit-usuarios-e.component';




@NgModule({
  declarations: [
    ListUsuariosEComponent,
    InsertUsuariosEComponent,
    EditUsuariosEComponent
  ],
  imports: [
    CommonModule
  ],
  
})
export class UsuariosEmpleadosModule { }
