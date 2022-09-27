import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ImagesServices } from 'src/app/services/image.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {

  images = [
    {
      name: 'Suraji',
      src: 'assets/test3.jpg'
    },
    {
      name: 'Vadan',
      src: 'assets/test2.jpg'
    },
    {
      name: 'Maniacarta',
      src: 'assets/test1.jpg'
    }, 
  ];
  showContainer = false;
  user: any;

  constructor(private router: Router, private imagesServices: ImagesServices, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.getImages();
    this.showImages();
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
    const loading = await this.showLoading();
    this.imagesServices.getImages().subscribe(
      data => {
        this.user = data.user;
        localStorage.setItem('artistName', this.user.name);
      },
      err => console.log(err),
      () => loading.dismiss()
    );

    if(event) {
      event.target.complete();
    }
  }

  showImages() {
    if(this.images) {
      this.showContainer = true;
    }
  }
}
