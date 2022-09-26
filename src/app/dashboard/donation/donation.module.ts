import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DonationComponent } from './donation.component';

@NgModule({
  declarations: [DonationComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DonationComponent]
})
export class DonationModule { }
