import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'colores/:idioma',
    loadChildren: () => import('./componentes/colores/colores.module').then( m => m.ColoresPageModule)
  },
  {
    path: 'animales/:idioma',
    loadChildren: () => import('./componentes/animales/animales.module').then( m => m.AnimalesPageModule)
  },
  {
    path: 'numeros/:idioma',
    loadChildren: () => import('./componentes/numeros/numeros.module').then( m => m.NumerosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
