import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriaFeaPage } from './galeria-fea.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriaFeaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriaFeaPageRoutingModule {}
