import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-fizik-form',
  templateUrl: './fizik-form.component.html',
  styleUrls: ['./fizik-form.component.css', '../register-page.component.css']
})
export class FizikFormComponent implements OnInit{

  passwordFieldType: string = 'password';
  fizform: FormGroup;
  @Output() submitForm = new EventEmitter<FormGroup>();

  ngOnInit() {
    this.fizform = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.pattern(/^(?:\+7|8)[\s-]?(\(?\d{3}\)?)[\s-]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})$/)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/)
      ]),
      privacyPolicy: new FormControl(false, [Validators.requiredTrue]),
      isFiz: new FormControl(true)
    })
  }

  OnSubmit(){
    this.submitForm.emit(this.fizform);
  }

  togglePasswordVisibility(){
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
