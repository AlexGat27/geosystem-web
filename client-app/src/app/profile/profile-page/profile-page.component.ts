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
  public userdata;

  constructor(private auth: AuthService){
  }

  ngOnInit(){
    this.auth.getUser()
      .subscribe(data => {
        this.userdata = data;
        console.log(this.userdata);
      });
  }

  logout(){
    this.auth.logout();
  }

}
