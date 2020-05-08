import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriaLindaPageRoutingModule } from './galeria-linda-routing.module';

import { GaleriaLindaPage } from './galeria-linda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriaLindaPageRoutingModule
  ],
  declarations: [GaleriaLindaPage]
})
export class GaleriaLindaPageModule {}
