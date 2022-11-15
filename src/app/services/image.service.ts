import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class ImagesServices {

    constructor(private http: HttpClient) { }

    getRandomImages() {
        const headers = new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
            .set('content-type', 'application/json');

        const url = `${environment.url}/users`;
        return this.http.get<any>(url, { headers });
    }

    getImages() {
        const token = localStorage.getItem('token');
        const data: any = this.getUserdata(token);
        const headers = new HttpHeaders()
            .set('Authorization', token)
            .set('content-type', 'application/json');

        const url = `${environment.url}/users/${data.id}/images`;
        return this.http.get<any>(url, { headers });
    }

    getDonations() {
        const token = localStorage.getItem('token');
        const data: any = this.getUserdata(token);
        const headers = new HttpHeaders()
            .set('Authorization', token)
            .set('content-type', 'application/json');

        const url = `${environment.url}/users/${data.id}/donations`;
        return this.http.get<any>(url, { headers });
    }

    uploadImage(imageName: string, imageUri: string) {
        const token = localStorage.getItem('token');
        const data: any = this.getUserdata(token);
        const imageInfo = {
            name: imageName,
            url: imageUri
        };

        const headers = new HttpHeaders()
            .set('Authorization', token)
            .set('content-type', 'application/json');

        const url = `${environment.url}/users/${data.id}/images`;
        return this.http.post(url, imageInfo, { headers });
    }

    getUserdata(token: string) {
        try {
            return jwt_decode(token);
        } catch (error) {
            return null;
        }
    }
}
