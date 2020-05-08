import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficaFeasPageRoutingModule } from './grafica-feas-routing.module';

import { GraficaFeasPage } from './grafica-feas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficaFeasPageRoutingModule
  ],
  declarations: [GraficaFeasPage]
})
export class GraficaFeasPageModule {}
