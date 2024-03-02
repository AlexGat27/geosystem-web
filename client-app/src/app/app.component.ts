import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { AdminLoginService } from './core/services/adminLogin.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  title = 'client-app';

  constructor(private auth: AuthService, private authAdmin: AdminLoginService){}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');
    const potentialIsFiz = localStorage.getItem('isFiz');
    const potentialAdmin = localStorage.getItem('isAdmin');
    if (potentialToken !== "undefined" || potentialToken !== null){
      this.auth.setToken(potentialToken);
    }
    if (potentialIsFiz !== "undefined" && potentialIsFiz !== null){
      this.auth.setFiz(JSON.parse(potentialIsFiz).toLowerCase());
    }
    if (potentialAdmin !== "undefined" && potentialAdmin !== null){
      this.authAdmin.isAuthenticated = true;
    }
  }
}
