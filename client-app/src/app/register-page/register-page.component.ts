import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
      password1: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      isFiz: new FormControl(true, [Validators.required]),
      privacyPolicy: new FormControl(false, [Validators.required]),
    })
  };

  OnSubmit(){
    
  }
}
