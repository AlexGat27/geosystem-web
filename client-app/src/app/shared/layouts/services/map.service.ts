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


}