import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, OnDestroy{
  isAdminAuth: boolean;
  isAdminSubscribtion: Subscription;
  constructor(private adminService: AdminService){}
  ngOnInit(): void {
    this.isAdminSubscribtion = this.adminService.isAuthenticated$.subscribe(isAuth => { this.isAdminAuth = isAuth });
  }
  ngOnDestroy(): void {
    this.isAdminSubscribtion.unsubscribe();
  }
}
