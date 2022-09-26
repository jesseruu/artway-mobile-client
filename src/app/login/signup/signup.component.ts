import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { loadingController } from '@ionic/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  isButtonDisabled = true;
  name: string;
  email: string;
  password: string;

  constructor(
    private authService: AuthService, 
    private loadingCtrl: LoadingController,
    private router: Router
  ) {} 

  ngOnInit() {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento',
      spinner: 'circular'
    });

    loading.present();
    return loading;
  }

  goBack() {
    this.router.navigate(['..']);
  }

  getName(event: any) {
    this.name = event.detail.value;
  }

  getEmail(event: any) {
    this.email = event.detail.value;
  }

  getPassword(event: any) {
    this.password = event.detail.value;
  }

  checkInputs() {
    if(this.name && this.email && this.password) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  async signup() {
    const load = await this.showLoading();
    try {
      this.authService.signup(this.name, this.email, this.password).subscribe(data => {
        load.dismiss();
        this.router.navigate(['auth']);
        console.log(data);
      });
    } catch (error) {
      load.dismiss();
      console.log(error);
    }
  }

}
