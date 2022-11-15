import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

interface IUser {
  name: string;
  email: string;
  donations: number;
  images: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  name: string;
  email: string;
  donations: number;
  images: number;

  constructor(private router: Router, private loadingCtrl: LoadingController, private auth: AuthService) { }

  async ngOnInit() {
    await this.getUsers();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento',
      spinner: 'circular'
    });

    loading.present();
    return loading;
  }

  async goBack() {
    await this.router.navigate(['dashboard/settings']);
  }

  async getUsers() {
    const loading = await this.showLoading();
    const data: any = this.getUserdata(localStorage.getItem('token'));
    this.auth.getUser(data.id).subscribe(
      info => {
        const users = info.resultUser;
        this.name = users.name;
        this.email = users.email;
        this.donations = users.donations.length;
        this.images = users.images.length;
      },
      err => {
        console.log(err);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  getUserdata(token: string) {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }
}
