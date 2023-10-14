import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  @Input()
  isFiz!: boolean;
  isEnterprise!: boolean;
  constructor(){};

  ngOnInit(): void {};

}
