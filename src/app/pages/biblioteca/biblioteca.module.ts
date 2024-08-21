import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPlantelesComponent } from './pages/list-planteles/list-planteles.component';
import { LibroComponentsRoutes } from './biblioteca.routing';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { BibliotecaLayoutComponent } from './layout/biblioteca-layout.component';
import { ListBibliotecaAndradeComponent } from './pages/list-biblioteca-andrade/list-biblioteca-andrade.component';



@NgModule({
  declarations: [
    ListPlantelesComponent,
    BibliotecaLayoutComponent,
    ListBibliotecaAndradeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LibroComponentsRoutes),
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
  ],
  
})
export class BibliotecaModule { }
