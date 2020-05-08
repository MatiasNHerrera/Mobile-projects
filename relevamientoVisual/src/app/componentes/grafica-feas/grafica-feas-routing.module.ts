import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficaFeasPage } from './grafica-feas.page';

const routes: Routes = [
  {
    path: '',
    component: GraficaFeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficaFeasPageRoutingModule {}
