import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";

@Injectable()
export class AdminService {
    private isAuth: boolean = false;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient,
                private router: Router){
    }

    login(userValue): Observable<{token: string}> {
        console.log(userValue)
        return this.http.post<any>("/api/v1/admin/login", userValue)
        .pipe(
            tap(() => {
                this.setAuthenticated(true);
                this.router.navigate(["admin", "home"]);
            }),//
            catchError(er => {
                console.log(er);
                return throwError(er);
            })
        );
    }
    logout() {
        this.setAuthenticated(false);
        localStorage.clear();
    }

    getUser(): Observable<any>{
        return this.http.get<any>("/api/v1/auth/getUser");
    }
    setAuthenticated(isAuth: boolean){
        this.isAuth = isAuth;
        this.isAuthenticatedSubject.next(this.isAuth);
        localStorage.setItem("isAdmin", String(this.isAuth));
    }
    isAuthenticated(): boolean {
        return this.isAuth;
    }
}