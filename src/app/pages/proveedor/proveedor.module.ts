import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component';
import { InsertProveedorComponent } from './pages/insert-proveedor/insert-proveedor.component';
import { EditProveedorComponent } from './pages/edit-proveedor/edit-proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentModule } from 'src/app/shared/shared.module';

import { RouterModule } from '@angular/router';
import { UsuarioComponentsRoutes } from '../usuarios/usuarios.routing';
import { ProveedorComponentsRoutes } from './proveedor.routes';



@NgModule({
  declarations: [
    ListProveedorComponent,
    InsertProveedorComponent,
    EditProveedorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProveedorComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    SharedComponentModule 
  ]
})
export class ProveedorModule { }
