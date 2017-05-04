import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   username:string = '';
  password:string = '';

  constructor(private router: Router) { }


  ngOnInit() {}


clicked(username:HTMLInputElement, password:HTMLInputElement){
  if((username.value=="1"&&password.value=="1")||(username.value=="2"&&password.value=="2")||
  (username.value=="3"&&password.value=="3")){
    alert("Wellcom tenPartner")
  this.router.navigateByUrl('/home');
  }

password.value=null;
username.value=null;
}


}

