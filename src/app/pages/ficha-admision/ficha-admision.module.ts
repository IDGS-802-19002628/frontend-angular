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
import { FichaComponentsRoutes } from './ficha.routing';
import { SharedComponentModule } from 'src/app/shared/shared.module';

import { FormularioComponent } from './pages/formulario/formulario.component';
import { PagoComponent } from './pages/pago/pago.component';
import { AspiranteComponent } from './pages/aspirante/aspirante.component';


@NgModule({
  declarations: [
    FormularioComponent,
    PagoComponent,
    AspiranteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FichaComponentsRoutes),
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
export class FichaAdmisionModule { }
