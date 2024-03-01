import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent{
  constructor(private auth: AuthService) {};

  @Input()
  public authenticated = computed(() => {return this.auth.authenticated()});
};
