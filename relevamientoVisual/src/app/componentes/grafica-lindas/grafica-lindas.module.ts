import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficaLindasPageRoutingModule } from './grafica-lindas-routing.module';

import { GraficaLindasPage } from './grafica-lindas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficaLindasPageRoutingModule
  ],
  declarations: [GraficaLindasPage]
})
export class GraficaLindasPageModule {}
