import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHomeComponent } from './pages/landing-home/landing-home.component';
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
import { landingComponentsRoutes } from './landing.routes';



@NgModule({
  declarations: [
    LandingHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(landingComponentsRoutes),
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
export class LandingModule { }
