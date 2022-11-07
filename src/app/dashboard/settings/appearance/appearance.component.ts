import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
