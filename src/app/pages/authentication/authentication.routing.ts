import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import {ErrorPermisosComponent} from './error-permisos/error-permisos.component';

import { LadingPagesComponent } from './lading-pages/lading-pages.component';
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'lading',
        component: LadingPagesComponent
      },
      
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'no-permission',
        component: ErrorPermisosComponent,
      },

    ],
  },
];
