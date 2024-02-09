import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PotholeService {

    constructor(private http: HttpClient){
    }

    imageProcessing(image: Blob, position: GeolocationPosition): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', image, 'image.jpg');
        formData.append('geolat', position.coords.latitude.toString());
        formData.append('geolon', position.coords.longitude.toString());
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.http.post<any>("/api/v1/mediaProcessing/imageProcessing", formData, {
            headers: headers,
        });
    }
}