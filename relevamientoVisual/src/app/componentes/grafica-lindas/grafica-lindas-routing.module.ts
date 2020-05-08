import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficaLindasPage } from './grafica-lindas.page';

const routes: Routes = [
  {
    path: '',
    component: GraficaLindasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficaLindasPageRoutingModule {}
