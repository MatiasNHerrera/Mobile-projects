import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'home/:perfil', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  { path: 'splash', loadChildren: () => import('./app.component').then( m => m.AppComponent)},
  {
    path: 'listado/:perfil',
    loadChildren: () => import('./componentes/listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'partido',
    loadChildren: () => import('./componentes/partido/partido.module').then( m => m.PartidoPageModule)
  },
  {
    path: 'mas-ganadores/:perfil',
    loadChildren: () => import('./componentes/mas-ganadores/mas-ganadores.module').then( m => m.MasGanadoresPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
