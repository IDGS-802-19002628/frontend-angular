import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/pages/not-found/not-found.component';
import { ProveedorModule } from './pages/proveedor/proveedor.module';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
          
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
          
      },

    

      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
          
      },
      
      {
        path: 'proveedores',
        loadChildren: () =>
          import('./pages/proveedor/proveedor.module').then((m) => m.ProveedorModule),
          
      },
      
      {
        path: 'productos',
        loadChildren: () =>
          import('./pages/producto/producto.module').then((m) => m.ProductoModule),
          
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('./pages/categoria/categoria.module').then((m) => m.CategoriaModule),
          
      },
      {
        path: 'landing',
        loadChildren: () =>
          import('./pages/landing/landing.module').then((m) => m.LandingModule),
          
      },
      {
        path: 'produccionV2',
        loadChildren: () =>
          import('./pages/produccion-v2/produccion-v2.module').then((m) => m.ProduccionV2Module),
          
      },
      {
        path: 'receta',
        loadChildren: () =>
          import('./pages/receta/receta.module').then((m) => m.RecetaModule),
          
      },

      
    ],
  },

  
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
     
    ],
  },
  {
    path: '**',  // Wildcard para cualquier ruta no definida
    component: NotFoundComponent  // Componente de página no encontrada
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
