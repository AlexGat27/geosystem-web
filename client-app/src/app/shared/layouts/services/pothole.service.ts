import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PotholeService {

    constructor(private http: HttpClient){
    }

    // imageProcessing(imagePath) {
    //     this.http.post<any>("/api/v1/mediaProcessing/imageProcessing", image).subscribe(result => {
    //         for(var i = 0; i < result.length; i++){
    //             var data = result[i];
    //             data.geometry.coordinates = this.convert3857to4326(result[i].geometry.coordinates)
    //             this.markersSubject.next(data);
    //         }
    //     });
    // }
}