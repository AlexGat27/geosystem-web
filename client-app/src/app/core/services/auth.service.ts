import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, tap, throwError } from "rxjs";

interface LoginResponse {
    token: string;
    isfiz: boolean;
}

@Injectable()
export class AuthService {

    private token = null;
    private isfiz: boolean;
    public authenticated = signal(this.getToken() !== null);

    constructor(private http: HttpClient,
                private router: Router){
    }

    register(userValue: any): Observable<{token: string}> {
        return this.http.post<any>("/api/v1/auth/register", userValue);
    }

    login(userValue: any): Observable<{token: string}> {
        return this.http.post<LoginResponse>("/api/v1/auth/login", userValue)
        .pipe(
            tap((loginResponse: LoginResponse) => {
                localStorage.setItem('auth-token', loginResponse.token);
                localStorage.setItem('isFiz', String(loginResponse.isfiz))
                this.setToken(loginResponse.token);
                console.log(loginResponse.isfiz)
                this.isfiz = loginResponse.isfiz;
                this.router.navigate(["/profile"]);
            })
        );
    }

    getUser(): Observable<any>{
        return this.http.get<any>("/api/v1/auth/getUser").pipe(
            tap(userdata => {
                if (userdata === undefined || userdata === null)
                    this.logout();
            }),
            catchError(er => {
                console.log(er);
                this.logout();
                return this.router.navigate(["/login"]);
            })
        );
    }

    setToken(token: string){
        this.token = token;
        this.authenticated.set(this.getToken() !== null);
    }
    setFiz(isfiz: boolean){
        this.isfiz = isfiz;
    }

    getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean{
        return !!this.token;
    }

    logout() {
        this.setToken(null);
        this.setFiz(null);
        localStorage.clear();
        this.router.navigate([""]);
    }

    isUserFiz(): boolean{
        if (this.isAuthenticated()){
            return this.isfiz;
        }
        return false;
    }
}
