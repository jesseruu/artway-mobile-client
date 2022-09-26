import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  images = [
    {
      name: 'Maniacarta',
      src: 'assets/test1.jpg'
    }, {
      name: 'Vadan',
      src: 'assets/test2.jpg'
    }, {
      name: 'Suraji',
      src: 'assets/test3.jpg'
    }
  ];

  name: string;
  showContainer = false
  constructor() { }

  ngOnInit() {

    const data: any = this.getUserdata(localStorage.getItem('token'));
    this.name = data.name;
  }

  getUserdata(token: string){
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

  changeThing() {
    this.showContainer = true;
  }

}
