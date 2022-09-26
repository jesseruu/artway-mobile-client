import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin(email: string, password: string){
    const userBody = {
      email: email,
      password: password
    }

    const url = `${environment.url}/auth/signin`;
    return this.http.post<any>(url, userBody);
  }

  signup(name: string, email?: string, password?: string) {
    const userBody = {
      name: name,
      email: email,
      password: password
    }

    const url = `${environment.url}/auth/signup`;
    return this.http.post<any>(url, userBody);

  }
}
