import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasGanadoresPage } from './mas-ganadores.page';

const routes: Routes = [
  {
    path: '',
    component: MasGanadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasGanadoresPageRoutingModule {}
