import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminLoginService } from 'src/app/core/services/adminLogin.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy{
  form: FormGroup;
  aSub: Subscription;
  @Input() authError: boolean = false;
  constructor(private adminLogService: AdminLoginService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
  }
  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  OnSubmit(){
    this.form.disable();
    this.aSub = this.adminLogService.login(this.form.value).subscribe(
      () => {
        this.authError = false;
      },
      error => {
        this.authError = true;
        this.form.enable();
      }
    );
  }
}
