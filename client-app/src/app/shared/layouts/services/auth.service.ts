import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token = null;

    constructor(private http: HttpClient){
    }

    register(userValue): Observable<{token: string}> {
        return this.http.post<any>("/api/auth/register", userValue);
    }

    login(userValue): Observable<{token: string}> {
        return this.http.post<{token: string}>("/api/auth/login", userValue)
        .pipe(
            tap(
                ({token}) => {
                    localStorage.setItem('auth-token', token);
                    this.setToken(token);
                }
            )
        );
    }

    setToken(token: string){
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean{
        return !!this.token;
    }

    logout() {
        this.setToken(null);
        localStorage.clear();
    }
}