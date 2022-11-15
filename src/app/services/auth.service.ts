import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signin(email: string, password: string) {
    const userBody = {
      email,
      password
    };

    const url = `${environment.url}/auth/signin`;
    return this.http.post<any>(url, userBody);
  }

  signup(name: string, email?: string, password?: string) {
    const userBody = {
      name,
      email,
      password
    };

    const url = `${environment.url}/auth/signup`;
    return this.http.post<any>(url, userBody);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }
}
