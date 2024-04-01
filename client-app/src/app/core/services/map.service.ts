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
            console.log(result)
            for(var i = 0; i < result.length; i++){
                var data = result[i];
                this.markersSubject.next(data);
            }
        });
    }
}