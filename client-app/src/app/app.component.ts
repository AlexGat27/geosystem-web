import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  title = 'client-app';

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');
    const potentialIsFiz = JSON.parse(localStorage.getItem('isFiz').toLowerCase());
    if (potentialToken !== "undefined" || potentialToken !== null){
      this.auth.setToken(potentialToken);
    }
    if (potentialIsFiz !== "undefined" && potentialIsFiz !== null){
      this.auth.setFiz(potentialIsFiz);
    }
  }
}
