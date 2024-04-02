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

    register(userValue): Observable<{token: string}> {
        return this.http.post<any>("/api/v1/auth/register", userValue);
    }

    login(userValue): Observable<{token: string}> {
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
            catchError(er => {
                console.log(er);
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

    isInnCorrect(inn: string): boolean{
        // Если inn не содержит строку то сразу вернуть false
        if (typeof inn !== 'string') return false
      
        // Если 10-значный ИНН
        if (inn.match(/^\d{10}$/)) {
          // Вычислить сумму произведений цифр ИНН (с 1-й по 9-ю) на следующие коэффициенты — 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 2 * ИНН[1] + 4 * ИНН[2] + ...).
          const sum = [2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)
      
          // Вычислить остаток от деления полученной суммы на 11.
          // Сравнить младший разряд полученного остатка от деления с младшим разрядом ИНН. Если они равны, то ИНН верный.
          return (sum % 11) % 10 === Number(inn[9])
        }
      
        // Если 12-значный ИНН
        if (inn.match(/^\d{12}$/)) {
          // Вычислить 1-ю контрольную цифру:
          // Вычислить сумму произведений цифр ИНН (с 1-й по 10-ю) на следующие коэффициенты — 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 7 * ИНН[1] + 2 * ИНН[2] + ...).
          const sum1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)
      
          // Вычислить 2-ю контрольную цифру:
          // Вычислить сумму произведений цифр ИНН (с 1-й по 11-ю) на следующие коэффициенты — 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 3 * ИНН[1] + 7 * ИНН[2] + ...).
          const sum2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)
      
          // Вычислить младший разряд остатка от деления полученных сумм на 11.
          // Сравнить 1-ю контрольную цифру с 11-й цифрой ИНН и сравнить 2-ю контрольную цифру с 12-й цифрой ИНН. Если они равны, то ИНН верный.
          return (sum1 % 11) % 10 === Number(inn[10]) && (sum2 % 11) % 10 === Number(inn[11])
        }
      
        // Во всех остальных ИНН некорректный 
        return false
    }

    isUserFiz(): boolean{
        if (this.isAuthenticated()){
            return this.isfiz;
        }
        return false;
    }
}