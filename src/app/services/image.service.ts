import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesServices {

    constructor(private http: HttpClient){}
    
    getImages() {
        const headers = new HttpHeaders()
            .set('Authorization', localStorage.getItem("token"))
            .set('content-type', 'application/json');
    
        const url = `${environment.url}/users`;
        return this.http.get<any>(url, {'headers': headers});
    }
}