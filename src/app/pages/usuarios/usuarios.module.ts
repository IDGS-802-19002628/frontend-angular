import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';

import { TablerIconsModule } from 'angular-tabler-icons';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { InsertUsuarioComponent } from './pages/insert-usuario/insert-usuario.component';
import { UsuarioComponentsRoutes } from './usuarios.routing';
import { EditUsuarioComponent } from './pages/edit-usuario/edit-usuario.component';
import { UsuarioLayoutComponent } from './layout/usuario-layout.component';




@NgModule({
  declarations: [
    ListUsuariosComponent,
    InsertUsuarioComponent,
    EditUsuarioComponent,
    UsuarioLayoutComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsuarioComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgApexchartsModule,
    TablerIconsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    SharedComponentModule // Agrega esta línea
  ]
})
export class UsuariosModule { }
