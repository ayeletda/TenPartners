import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
   username:string = '';
  password:string = '';

  constructor() { }

  ngOnInit() {}


clicked(username:HTMLInputElement, password:HTMLInputElement){
  if(username.value=="advaav55@gmail.com"&&password.value=="1234")
    alert("Wellcom tenPartner")

  password.value=null;
username.value=null;
}


}
