import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { DiscoverRoutingModule } from './discover-routing.module';


@NgModule({
  declarations: [DiscoverModule],
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    IonicModule
  ],
  exports: [DiscoverModule]
})
export class DiscoverModule { }
