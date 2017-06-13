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

export class LoginComponent implements OnInit 
{


  constructor(private serviceService:ServiceService, private router:Router)
  {
    
  }

  ngOnInit() {}

  login(username:HTMLInputElement, password:HTMLInputElement)
  {
    this.serviceService.login(username,password).then(
      x => { console.log('f');
      }
    )
  }
  
  fbLogin()
  {
    this.serviceService.FBlogin().then(x => { this.afterLogin() });
  }

  gogLogin()
  {
    this.serviceService.GOGlogin().then(x => { this.afterLogin() });
  }

  twitLogin()
  {
    this.serviceService.TWITlogin();
  }

  private afterLogin() {
    console.log("afterlogin");
    if(this.serviceService.getPermission()=="2")
                      this.router.navigateByUrl('/voting');
                  

            else if(this.serviceService.getPermission()=="1")
                       this.router.navigateByUrl('/home');
  }


}

