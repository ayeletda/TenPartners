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

//======================== HeaderComponent class ===============================================================

export class HeaderComponent implements OnInit 
{
  private _opened: boolean 

  constructor(private router: Router, private service:ServiceService) 
  {
    this._opened = false;
  }

  @Input()item;

  ngOnInit() {}
  
  private logOut()
  {
    this.service.logout();
  }

  private _toggleSidebar() 
  {
    this._opened = !this._opened;
  }

}
