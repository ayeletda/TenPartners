import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   username:string = '';
  password:string = '';

  constructor(private router: Router,
          public anguarfireAuth:AngularFireAuth
          ) { }


  ngOnInit() {}


clicked(username:HTMLInputElement, password:HTMLInputElement){
  this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).
  then((user)=>{
    alert("Wellcom tenPartner");
    this.router.navigateByUrl('/home');

  })
  .catch((error)=>{
        alert("Email or password incorrect");

  });

password.value=null;
username.value=null;
}


}

