import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './signup.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  exports: [SignupComponent]
})
export class SignupModule { }
