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
  //user details
  user = { id: null, permission: null, community: null, name: null, email: null };

  constructor(private service:ServiceService, private router:Router)
  {   
    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.getDetails(this.user);
  }

  ngOnInit() {}

  login(username:HTMLInputElement, password:HTMLInputElement)
  {
    this.service.login(username,password);
  }
  
  fbLogin()
  {
    this.service.FBlogin();
  }

  gogLogin()
  {
    this.service.GOGlogin();
  }

  twitLogin()
  {
    this.service.TWITlogin();
  }
   
  afterLogin() 
  {
    //if it's admin
    if(this.user.permission == "1")
      this.router.navigateByUrl('/home');

    //if it's authorized user
    else if(this.user.permission == "2")
      this.router.navigateByUrl('/voting');

    //if it's blocked user
    else if(this.user.permission == "3")
     this.router.navigateByUrl('');

  }

  forgotPassword(){
//      var auth = this.serviceService.anguarfireAuth.auth;
//      var emailAddress = "user@example.com";

// auth.sendPasswordResetEmail(emailAddress).then(function() {
//   // Email sent.
// }, function(error) {
//   // An error happened.
// });

    }
}