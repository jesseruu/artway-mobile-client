import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  name: string;
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

}
