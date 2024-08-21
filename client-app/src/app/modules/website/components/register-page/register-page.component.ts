import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnDestroy{

  isFiz: boolean = true;
  errorMsg: string;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router){};

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe();
    }
    this.errorMsg = undefined;
  }

  OnSubmit(form: FormGroup){
    form.disable();
    this.aSub = this.auth.register(form.value).subscribe(() => {
      this.router.navigate(["/login"], {queryParams: {registered: true}})
    }, ({error}) => {
      this.errorMsg = error.message;
      console.warn(error);
      form.enable();
    });
  }

}
