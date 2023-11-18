import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private http: HttpClient){
    }

    getPotholes(): Observable<any> {
        return this.http.get<any>("/api/map/getPotholes");
    }

    convert3857to4326(coords){
        var x = coords[0] / 20037508.34 * 180;
        var y = coords[1] / 20037508.34 * 180;
        y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
        return [y, x];
    }
}