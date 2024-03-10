import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy{
  form: FormGroup;
  aSub: Subscription;
  @Input() authError: boolean;
  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
    this.adminService.setAuthenticated(false);
    localStorage.clear();
    this.authError = false;
  }
  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  OnSubmit(){
    this.form.disable();
    this.aSub = this.adminService.login(this.form.value).subscribe(
      () => {console.log("Успешная авторизация");},
      error => {
        this.authError = true;
        this.form.enable();
      }
    );
  }
}
