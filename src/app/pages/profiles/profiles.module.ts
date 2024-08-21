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
import { ProfileMaestroComponent } from './pages/profile-maestro/profile-maestro.component';
import{ ProfileLayoutComponent } from './layout/profile-layout.component';
import { ProfileComponentsRoutes } from './profiles.routing';
import { SharedComponentModule } from 'src/app/shared/shared.module';
import { ProfileAlumnoComponent } from './pages/profile-alumno/profile-alumno.component';
import { ProfileAdministrativoComponent } from './pages/profile-administrativo/profile-administrativo.component';


@NgModule({
  declarations: [
    
  
    ProfileMaestroComponent,
    ProfileLayoutComponent,
    ProfileAlumnoComponent,
    ProfileAdministrativoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileComponentsRoutes),
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
export class ProfilesModule { }
