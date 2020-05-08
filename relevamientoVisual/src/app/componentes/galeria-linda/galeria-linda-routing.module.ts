import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriaLindaPage } from './galeria-linda.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriaLindaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriaLindaPageRoutingModule {}
