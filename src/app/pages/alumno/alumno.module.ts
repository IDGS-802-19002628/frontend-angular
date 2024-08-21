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
import { ListAlumnoComponent } from './pages/list-alumno/list-alumno.component';
import { InsertAlumnoComponent } from './pages/insert-alumno/insert-alumno.component';
import { AlumnoComponentsRoutes } from './alumno.routing';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { ListadoInscripcionesComponent } from './pages/listado-inscripciones/listado-inscripciones.component';
import {AlumnosLayoutComponent} from './layout/alumnos-layout.component';
import { DetalleInscripcionComponent } from './pages/detalle-inscripcion/detalle-inscripcion.component';
@NgModule({
  declarations: [
    ListAlumnoComponent,
    InsertAlumnoComponent,
    ListadoInscripcionesComponent,
    AlumnosLayoutComponent,
    DetalleInscripcionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AlumnoComponentsRoutes),
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
  ],
  providers: [
    MatIconRegistry,//fecha de mx
    
  ]

})
export class AlumnoModule { }
