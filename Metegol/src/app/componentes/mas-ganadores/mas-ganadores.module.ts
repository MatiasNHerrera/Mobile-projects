import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasGanadoresPageRoutingModule } from './mas-ganadores-routing.module';

import { MasGanadoresPage } from './mas-ganadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasGanadoresPageRoutingModule
  ],
  declarations: [MasGanadoresPage]
})
export class MasGanadoresPageModule {}
