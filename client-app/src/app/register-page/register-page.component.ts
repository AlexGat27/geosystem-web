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
  errorMsg: string;
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
      privacyPolicy: new FormControl(false, [Validators.requiredTrue]),
      isFiz: new FormControl(true)
    })
    this.enterpriseform = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      privacyPolicy: new FormControl(null, [Validators.requiredTrue]),
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
        () => {
          this.router.navigate(["/login"], {
            queryParams: {
              registered: true
            }
          })
        },
        (error) => {
          this.errorMsg = error.message;
          console.warn(error);
          this.fizform.enable();
        }
      );
    } else{
      this.aSub = this.auth.register(this.enterpriseform.value).subscribe(
        () => this.router.navigate(["/login"], {
          queryParams: {
            registered: true
          }
        }),
        ({error}) => {
          this.errorMsg = error.message;
          console.warn(this.errorMsg);
          this.enterpriseform.enable();
        }
      );
    }
  }

  isInnCorrect = (inn: string) => {
    return this.auth.isInnCorrect(inn);
  }

}
