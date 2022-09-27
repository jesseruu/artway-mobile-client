import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, DiscoverComponent, SettingsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
