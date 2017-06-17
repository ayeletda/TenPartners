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
  private _opened: boolean;
  private newPass:string;

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


  private chengePassword()
  {
    var user = this.service.anguarfireAuth.auth.currentUser;
    let newPassword = prompt("Enter new password");

    if (newPassword=="")
          return;
          
user.updatePassword(newPassword).then(function() {
  // Update successful.
  alert("The password change");
}, function(error) {
    alert("The password don't change");

  // An error happened.
});
  }
}
