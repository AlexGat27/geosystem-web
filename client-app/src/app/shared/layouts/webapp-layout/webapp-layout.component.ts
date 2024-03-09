import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webapp-layout',
  templateUrl: './webapp-layout.component.html',
  styleUrls: ['./webapp-layout.component.css']
})
export class WebappLayoutComponent implements OnInit{

  ngOnInit(): void {
    if(localStorage.getItem("isAdmin")){localStorage.removeItem("isAdmin")};
  }
}
