import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit{
  public authenticated = false;
  constructor(private auth: AuthService) {};

  ngOnInit(): void {
    if (this.auth.isAuthenticated()){
      this.authenticated = true;
    }else{
      this.authenticated = false;
    }
  }
}
