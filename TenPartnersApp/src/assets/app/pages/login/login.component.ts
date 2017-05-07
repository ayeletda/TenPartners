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
    console.log(user)
  })
  .catch((error)=>{

  });
  if((username.value=="1"&&password.value=="1")||(username.value=="2"&&password.value=="2")||
  (username.value=="3"&&password.value=="3")){
    alert("Wellcom tenPartner")
  this.router.navigateByUrl('/home');
  }

password.value=null;
username.value=null;
}


}

