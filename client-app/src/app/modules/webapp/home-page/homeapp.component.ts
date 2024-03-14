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
  @Input() countPhotos: string;
  @Input() countPotholes: string;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getUser().subscribe(userdata =>{
      console.log(userdata)
      this.username = userdata.login;
      this.countPhotos = userdata.usualuser.count_photos;
      this.countPotholes = userdata.usualuser.count_potholes;
    })
  }

  onSwipe(){
    this.showProfile = !this.showProfile;
  }
}
