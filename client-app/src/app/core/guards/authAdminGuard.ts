
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AdminService } from "src/app/core/services/admin.service";

@Injectable({
    providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate, CanActivateChild{
    constructor(private adminService: AdminService,
                private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>{
        if (this.adminService.isAuthenticated){
            return of(true);
        }else{
            this.router.navigate(['/admin/login'], {
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