import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PotholeService {

    constructor(private http: HttpClient){
    }

    imageProcessing(image: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', image);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');

        return this.http.post<any>("/api/v1/mediaProcessing/imageProcessing", formData, {
            headers: headers,
        });
        // return this.http.post<any>("http://127.0.0.1:8000/", formData, {
        //     headers: headers,
        // });
    }
}