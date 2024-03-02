import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable()
export class AdminLoginService {
    isAuthenticated: boolean = false;

    constructor(private http: HttpClient,
                private router: Router){
    }

    login(userValue): Observable<{token: string}> {
        console.log(userValue)
        return this.http.post<any>("/api/v1/admin/login", userValue)
        .pipe(
            tap(() => {
                console.log("succesful")
                localStorage.clear();
                this.isAuthenticated = true;
                localStorage.setItem("isAdmin", String(this.isAuthenticated));
                this.router.navigate(["admin/home"]);
            }),//
            catchError(er => {
                console.log(er);
                return throwError(er);
            })
        );
    }
    logout() {
        this.isAuthenticated = false;
        localStorage.clear();
        this.router.navigate(["/login"]);
    }

    getUser(): Observable<any>{
        return this.http.get<any>("/api/v1/auth/getUser");
    }
    
}