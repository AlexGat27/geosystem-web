import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent{
  isAdminAuth: boolean;
  constructor(private adminService: AdminService){
    this.isAdminAuth = adminService.isAuthenticated;
  }
}
