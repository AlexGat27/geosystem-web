import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-homeapp',
  templateUrl: './homeapp.component.html',
  styleUrls: ['./homeapp.component.css', './homeappProfile.component.css']
})
export class HomeappComponent implements OnInit{
  showProfile: boolean = false;
  @Input() username: string;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getUser().subscribe(userdata =>{
      this.username = userdata.login;
    })
  }

  onSwipe(){
    this.showProfile = !this.showProfile;
  }
}
