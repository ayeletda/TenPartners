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


  constructor(private serviceService:ServiceService)
  {
    
  }

  ngOnInit() {}

  login(username:HTMLInputElement, password:HTMLInputElement)
  {
    this.serviceService.login(username,password);

  }

}

