
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MobileGuard implements CanActivate, CanActivateChild{
    constructor(private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>{
        if (window.innerWidth < 768){return of(true);}
        else{
            return of(false);
        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  Observable<boolean>{
        return this.canActivate(route, state)
    };
}