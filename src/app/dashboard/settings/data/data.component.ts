import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
