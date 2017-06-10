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
      this.Service.anguarfireAuth.authState.subscribe(
        (auth) => {
          if(auth==null)
          {
            this.isLoggedIn=false;
            this.router.navigate(['']);
          }

          else{
            if(Service.getlogin()==true){
            this.isLoggedIn=true;
            console.log(Service.getCurrentEmail());        
            console.log(Service.getPermission());
            if(Service.getPermission()=="2")
                      this.router.navigateByUrl('/voting');
                  

            else if(Service.getPermission()=="1")
                       this.router.navigateByUrl('/home');

          }}
        }
      )
      this.isLoggedIn=Service.getlogin();
   }






}

