import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DiscoverComponent } from './discover/discover.component';
import { DonationComponent } from './donation/donation.component';
import { HomeComponent } from './home/home.component';
import { ImagesComponent } from './images/images.component';
import { ResumeComponent } from './resume/resume.component';
import { HistoryComponent } from './settings/history/history.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'discover',
        component: DiscoverComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'donation',
    component: DonationComponent
  },
  {
    path: 'images',
    component: ImagesComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'resume',
    component: ResumeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
