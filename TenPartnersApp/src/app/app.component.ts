import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {ServiceService} from './service.service';
import { Router } from '@angular/router';

@Component(
{
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  private isLoggedIn:boolean;

  constructor(private Service:ServiceService, private router:Router) 
  {
    console.log(this.Service.anguarfireAuth);
      this.Service.anguarfireAuth.authState.subscribe(
        (auth) => {
          if(auth==null)
          {
            this.isLoggedIn=false;
            this.router.navigate(['']);
          }

          else{
            this.isLoggedIn=true;
          }
        }
      )
      this.isLoggedIn=Service.getlogin();
   }






}

