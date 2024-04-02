import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

interface UserData{
  name: string;
  email: string,
  login: string,
  isfiz: boolean
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  
  @Input()
  public userdata: UserData;

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
  isUserFiz(): boolean{
    if (!this.userdata) {return true}
    return this.userdata.isfiz;
  }
  isUserGet(): boolean{
    if (this.userdata) {return true}
    else { return false }
  }
}
