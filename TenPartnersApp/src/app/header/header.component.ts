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
  isOpen: boolean;
  newPass: string;
  doesNeedPop: boolean;
  whatToPop: string;
  newPassword:string;

  constructor(private router: Router, private service:ServiceService) 
  {
    this.isOpen = false;
    this.whatToPop = "";
    this.doesNeedPop = false;
  }

  @Input()item;

  ngOnInit() {}
  
  logOut()
  {
    this.service.logout();
  }

  toggleSidebar() 
  {
    this.isOpen = !this.isOpen;
  }

  chengePassword()
  {
    this.doesNeedPop=false;
    let user = this.service.anguarfireAuth.auth.currentUser;

    if (this.newPassword=="")
      return;
          
    user.updatePassword(this.newPassword).then(function() 
    {
    // Update successful.
    alert("The password change");
    },  function(error) 
    {
      alert("The password don't change");

      // An error happened.
    });
  }


PopMassage(pop:string)
{
  this.whatToPop=pop;
  this.doesNeedPop =!this.doesNeedPop;
}



}

