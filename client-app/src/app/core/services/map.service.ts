import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class MapService {
    private markersSubject = new Subject<any>();
    markers$ = this.markersSubject.asObservable();

    constructor(private http: HttpClient){
    }

    getPotholes() {
        this.http.get<any>("/api/v1/map/getPotholes").subscribe(result => {
            for(var i = 0; i < result.length; i++){
                var data = result[i];
                // data.geometry.coordinates = this.convert3857to4326(result[i].geometry.coordinates)
                this.markersSubject.next(data);
            }
        });
    }

    // private convert3857to4326(coords){
    //     var x = coords[0] / 20037508.34 * 180;
    //     var y = coords[1] / 20037508.34 * 180;
    //     y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
    //     return [y, x];
    // }
}