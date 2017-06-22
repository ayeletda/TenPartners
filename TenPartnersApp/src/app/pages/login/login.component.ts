
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
  user;

  constructor(private service:ServiceService, private router:Router)
  {   
    //function (in servic.component.ts) that returns a pointer to user object that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.user = this.service.getUser();

    //In back to login page logout the user.... adva add !~~ ~
    this.service.logout();
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
    {
      alert("Your access to this application was refused by the admin");
      this.router.navigateByUrl('');
    }
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