import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriaFeaPageRoutingModule } from './galeria-fea-routing.module';

import { GaleriaFeaPage } from './galeria-fea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriaFeaPageRoutingModule
  ],
  declarations: [GaleriaFeaPage]
})
export class GaleriaFeaPageModule {}
