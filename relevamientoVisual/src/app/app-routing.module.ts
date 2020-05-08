import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule),  
  },
  { path: 'splash', loadChildren: () => import('./app.component').then( m => m.AppComponent)},
  {
    path: 'cosas-lindas',
    loadChildren: () => import('./componentes/cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
  },
  {
    path: 'cosas-feas',
    loadChildren: () => import('./componentes/cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
  },
  {
    path: 'galeria-linda',
    loadChildren: () => import('./componentes/galeria-linda/galeria-linda.module').then( m => m.GaleriaLindaPageModule)
  },
  {
    path: 'grafica-lindas',
    loadChildren: () => import('./componentes/grafica-lindas/grafica-lindas.module').then( m => m.GraficaLindasPageModule)
  },
  {
    path: 'galeria-fea',
    loadChildren: () => import('./componentes/galeria-fea/galeria-fea.module').then( m => m.GaleriaFeaPageModule)
  },
  {
    path: 'grafica-feas',
    loadChildren: () => import('./componentes/grafica-feas/grafica-feas.module').then( m => m.GraficaFeasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
