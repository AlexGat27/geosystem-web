import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/layouts/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy{

  isFiz: boolean = true;
  aSub: Subscription;
  fizform: FormGroup;
  enterpriseform: FormGroup;

  constructor(private auth: AuthService,
    private router: Router){};

  ngOnInit(): void {
    this.fizform = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      privacyPolicy: new FormControl(false, [Validators.required]),
      isFiz: new FormControl(true)
    })
    this.enterpriseform = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      company: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      privacyPolicy: new FormControl(false, [Validators.required]),
      isFiz: new FormControl(false)
    })
  };

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

  OnSubmit(){
    this.fizform.disable();
    this.enterpriseform.disable();
    if(this.isFiz){
      this.aSub = this.auth.register(this.fizform.value).subscribe(
        () => this.router.navigate(["/login"], {
          queryParams: {
            registered: true
          }
        }),
        error => {
          console.warn(error);
          this.fizform.enable();
        }
      );
    } else{
      this.aSub = this.auth.register(this.enterpriseform.value).subscribe(
        () => this.router.navigate(["/login"]),
        error => {
          console.warn(error);
          this.enterpriseform.enable();
        }
      );
    }
  }
}
