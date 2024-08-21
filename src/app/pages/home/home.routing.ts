import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
export const HomeComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];
