import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {ServiceService} from '../../service.service';

@Component(
{
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

//=============================================  VotingComponent class  ============================================================

export class LoginComponent implements OnInit 
{
  constructor(private serviceService:ServiceService, private router:Router)
  {   
  }

  ngOnInit() {}

  private login(username:HTMLInputElement, password:HTMLInputElement)
  {
    this.serviceService.login(username,password);
  }
  
  private fbLogin()
  {
    this.serviceService.FBlogin();
  }

  private gogLogin()
  {
    this.serviceService.GOGlogin();
  }

  private twitLogin()
  {
    this.serviceService.TWITlogin();
  }
   
  private afterLogin() 
  {
    //if it's admin
    if(this.serviceService.getPermission()=="1")
      this.router.navigateByUrl('/home');

    //if it's authorized user
    else if(this.serviceService.getPermission()=="2")
      this.router.navigateByUrl('/voting');

    //if it's blocked user
    else if(this.serviceService.getPermission()=="3")
     this.router.navigateByUrl('');

   }
}