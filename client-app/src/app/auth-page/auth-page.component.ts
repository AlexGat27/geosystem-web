import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  authform: FormGroup;

  ngOnInit(): void {
    this.authform = new FormGroup({
      login: new FormControl(null),
      INN: new FormControl(null, [Validators.minLength(12), Validators.maxLength(12)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      isFiz: new FormControl(true, [Validators.required]),
    })
  };

  OnSubmit(){
    
  }
}
