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
        console.log(formData.getAll('image'))
        return this.http.post<Blob>("/api/v1/mediaProcessing/imageProcessing", formData);
    }
}