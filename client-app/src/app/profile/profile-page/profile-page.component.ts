import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  
  @Input()
  public userdata = {
    login: '',
    email: '',
    phone_number: ''
  };

  constructor(private auth: AuthService){
  }

  ngOnInit(){
    this.auth.getUser().subscribe({
      next: data => {
        this.userdata = data;
      },
      error: er =>{
        console.log(er);
        this.logout();
      } 
    })
  }

  logout(){
    this.auth.logout();
  }

}
