import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isButtonDisabled = true;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento',
      spinner: 'circular'
    });

    loading.present();
    return loading;
  }

  getEmail(event: any) {
    this.email = event.detail.value;
  }

  getPassword(event: any) {
    this.password = event.detail.value;
  }

  checkInputs() {
    if(this.password && this.email) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }



  async signin() {
    const load = await this.showLoading();
    try {
      this.authService.signin(this.email, this.password).subscribe(data => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['dashboard']);
      });
      load.dismiss();
    } catch (error) {
      load.dismiss();
      console.log(error);
    }
  }
}
