import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoriaComponent } from './list-categoria/list-categoria.component';
import { InsertCategoriaComponent } from './insert-categoria/insert-categoria.component';
import { EditCategoriaComponent } from './edit-categoria/edit-categoria.component';
import { CategoriaComponentsRoutes } from './categoria.routes';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ListCategoriaComponent,
    InsertCategoriaComponent,
    EditCategoriaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriaComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    SharedComponentModule,
    MatSelectModule 
  ]
})
export class CategoriaModule { }
