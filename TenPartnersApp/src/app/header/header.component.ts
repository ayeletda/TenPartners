import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../service.service';

//stam bdika

@Component
({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit 
{
  
  private _opened: boolean = false;

  constructor(private router: Router,private serviceService:ServiceService) { }

  @Input()item;

  ngOnInit() {}
  
  private logOut(){
    this.serviceService.logout();
  }


  private _toggleSidebar() {
    this._opened = !this._opened;
  }



}
