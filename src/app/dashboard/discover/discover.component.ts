import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ImagesServices } from 'src/app/services/image.service';

interface IImages {
  name: string;
  src: string;
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {

  images: IImages[];
  user: any;

  constructor(private router: Router, private imagesServices: ImagesServices, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.getImages();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento',
      spinner: 'circular'
    });

    loading.present();
    return loading;
  }

  goToDonate() {
    this.router.navigate(['dashboard/donation']);
  }

  async getImages(event?: any) {
    this.images = [];
    const loading = await this.showLoading();
    this.imagesServices.getRandomImages().subscribe(
      data => {
        console.log(data);
        this.user = data.user;
        localStorage.setItem('artistName', this.user.name);
        if (this.user.images) {
          const images = this.user.images as any[];
          images.reverse().forEach((image) => {
            this.images.push({ name: image.name, src: image.url });
          });
        }
        console.log(this.images);
      },
      err => {
        console.log(err);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
    if (event) {
      event.target.complete();
    }
  }
}
