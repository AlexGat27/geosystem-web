import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/layouts/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit, OnDestroy{
  form: FormGroup;
  aSub: Subscription;
  authError: boolean = false;

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null),
      INN: new FormControl(null, [Validators.minLength(12), Validators.maxLength(12)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      isFiz: new FormControl(true, [Validators.required]),
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']){

      } else if (params['accessDenied']){

      }
    })
  };

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }

  OnSubmit(){
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate([""]),
        this.authError = false;
      },
      error => {
        this.authError = true;
        this.form.enable();
      }
    );
  }

  isInnCorrect = (inn: string) => {
    return this.auth.isInnCorrect(inn);
  }
}
