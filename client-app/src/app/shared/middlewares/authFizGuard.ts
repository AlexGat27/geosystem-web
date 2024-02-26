import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthFizGuard implements CanActivate, CanActivateChild{
    constructor(private auth: AuthService,
                private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>{
        if (this.auth.isUserFiz()){
            return of(true);
        }else{
            this.router.navigate(['/profile'], {
                queryParams:{
                    accessDenied: true
                }
            });
            return of(false);
        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  Observable<boolean>{
        return this.canActivate(route, state)
    };
}