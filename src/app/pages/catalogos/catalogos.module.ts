
import { CatalogosLayoutComponent } from './layout/catalogos-layout.component';
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
import { InsertCiclosComponent } from './pages/insert-ciclos/insert-ciclos.component';
import { ListCiclosComponent } from './pages/list-ciclos/list-ciclos.component';
// import { InsertAlumnoComponent } from './pages/insert-alumno/insert-alumno.component';
// import { AlumnoComponentsRoutes } from './alumno.routing';
import { SharedComponentModule } from 'src/app/shared/shared.module';
// import { ListadoInscripcionesComponent } from './pages/listado-inscripciones/listado-inscripciones.component';
// import {AlumnosLayoutComponent} from './layout/alumnos-layout.component';
// import { DetalleInscripcionComponent } from './pages/detalle-inscripcion/detalle-inscripcion.component';
import { CatalogosComponentsRoutes } from './catalogos.routing';
import { InsertEscuelasComponent } from './pages/insert-escuelas/insert-escuelas.component';
import { ListEscuelasComponent } from './pages/list-escuelas/list-escuelas.component';
import { EditCiclosComponent } from './pages/edit-ciclos/edit-ciclos.component';
import { ListGruposComponent } from './pages/list-grupos/list-grupos.component';
import { InsertGruposComponent } from './pages/insert-grupos/insert-grupos.component';
import { EditGruposComponent } from './pages/edit-grupos/edit-grupos.component';






@NgModule({
  declarations: [
    CatalogosLayoutComponent,
    ListCiclosComponent,
    InsertCiclosComponent,
    InsertEscuelasComponent,
    ListEscuelasComponent,
    EditCiclosComponent,
    ListGruposComponent,
    InsertGruposComponent,
    EditGruposComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CatalogosComponentsRoutes),
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
export class CatalogosModule { }
