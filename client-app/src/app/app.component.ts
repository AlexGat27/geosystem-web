import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/layouts/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  title = 'client-app';

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null){
      this.auth.setToken(potentialToken);
    }
  }
}
