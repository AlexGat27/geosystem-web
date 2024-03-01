import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-complex-page',
  templateUrl: './complex-page.component.html',
  styleUrls: ['./complex-page.component.css']
})

export class ComplexPageComponent implements OnInit{
  screenWidth: any;
  isMobile: boolean;

  ngOnInit(){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 1000){this.isMobile = true;}
    else{this.isMobile = false;}
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 1000){this.isMobile = true;}
    else{this.isMobile = false;}
  }

}
