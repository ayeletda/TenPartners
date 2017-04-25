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
  if(username.value=="advaav55@gmail.com"&&password.value=="1234"){
    alert("Wellcom tenPartner")
  this.router.navigateByUrl('/home');
  }

password.value=null;
username.value=null;
}


}

