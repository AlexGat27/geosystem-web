import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  isFiz: boolean

  constructor(){
    this.isFiz = true;
  }

  setEnterprise(){this.isFiz=false};
  setFiz(){this.isFiz=true};
}
