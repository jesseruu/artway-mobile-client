import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
