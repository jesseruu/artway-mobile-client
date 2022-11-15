import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ImagesServices } from 'src/app/services/image.service';

interface IDonations {
  amount: number;
  date: Date;
};

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  showDonations = false;
  donations: IDonations[];

  constructor(private router: Router, private loadingCtrl: LoadingController, private imagesServices: ImagesServices) { }

  async ngOnInit() {
    await this.getDonations();
  }

  async goBack() {
    await this.router.navigate(['dashboard/settings']);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento',
      spinner: 'circular'
    });

    loading.present();
    return loading;
  }

  async getDonations(event?: any) {
    this.donations = [];
    const loading = await this.showLoading();
    this.imagesServices.getDonations().subscribe(
      async data => {
        console.log(data);
        const donations = data as any[];
        donations.reverse().forEach((donation) => {
          this.donations.push({ amount: donation.amount, date: donation.date });
        });
      },
      async err => {
        console.log(err);
        await loading.dismiss();
      },

      async () => await loading.dismiss()
    );

    console.log(this.donations);
    if (this.donations && this.donations.length) {
      this.showDonations = true;
    } else {
      this.showDonations = false;
    }

    if (event) {
      event.target.complete();
    }
  }


}
