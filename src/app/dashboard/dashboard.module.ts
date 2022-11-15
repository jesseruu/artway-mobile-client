import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { SettingsComponent } from './settings/settings.component';
import { ImagesComponent } from './images/images.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { HistoryComponent } from './settings/history/history.component';
import { ResumeComponent } from './resume/resume.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    DiscoverComponent,
    SettingsComponent,
    ImagesComponent,
    ProfileComponent,
    HistoryComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonicModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
