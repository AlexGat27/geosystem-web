import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PotholeService } from "./pothole.service";

@Injectable()
export class MapService {
    private markersSubject = new Subject<any>();
    markers$ = this.markersSubject.asObservable();

    constructor(private http: HttpClient, private potholeService: PotholeService){
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

    exportMapCSV(){
        this.http.get<any>("/api/v1/map/createExportFile").subscribe(result => {
            const blob = new Blob([result], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'potholes.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    }
}