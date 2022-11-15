import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { ImagesServices } from 'src/app/services/image.service';
import { ViewWillEnter } from '@ionic/angular';

interface IImages {
  name: string;
  src: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  images: IImages[];
  name: string;
  showContainer = false;

  constructor(
    private router: Router,
    private imagesServices: ImagesServices,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {

    const data: any = this.getUserdata(localStorage.getItem('token'));
    this.name = data.name;
    await this.getImages();
    console.log(data);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento',
      spinner: 'circular'
    });

    loading.present();
    return loading;
  }

  getUserdata(token: string) {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

  goToNew() {
    this.router.navigate(['dashboard/images']);
  }

  async getImages(event?: any) {
    this.images = [];
    const loading = await this.showLoading();
    this.imagesServices.getImages().subscribe(
      data => {
        const images = data as any[];
        images.reverse().forEach((image) => {
          this.images.push({ name: image.name, src: image.url });
        });
      },
      err => {
        console.log(err);
        loading.dismiss();
      },

      () => loading.dismiss()
    );

    if (this.images.length >= 0) {
      this.showContainer = true;
    } else {
      this.showContainer = false;
    }

    if (event) {
      event.target.complete();
    }
  }
}
