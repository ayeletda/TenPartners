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
  user = {userID: null, permission: null, community: null, userName: null, email: null };

  constructor(private Service:ServiceService, private router:Router) 
  {
      let temp = this.Service.anguarfireAuth.authState.subscribe(
        (auth) => {
          if(auth==null)
          {
            this.isLoggedIn=false;
            this.router.navigate(['']);
          }

          else
          {

            this.user.userID = auth.uid;
            this.user.email = auth.email;

            this.getDetails();

          //   if(Service.getlogin()==true)
          //   {
          //   this.isLoggedIn=true;
            
          //   if(Service.getPermission()=="2")
          //             this.router.navigateByUrl('/voting');
                  

          //   else if(Service.getPermission()=="1")
          //              this.router.navigateByUrl('/home');

          // }
          }
        });
      //this.isLoggedIn=this.Service.getlogin();
      //this.Service.allSubscribe.push(temp);
   }


getDetails()
{
       let users = this.Service.af.list('/users',{ preserveSnapshot: true });

let temp1 = users
  .subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      
     var temp=snapshot.val();      
       if(this.user.email==snapshot.val().email||this.user.email==snapshot.val().email||this.user.email==snapshot.val().email)
          {
            this.user.permission =temp.permission;
            this.user.community=temp.associatedCommunity;
            this.user.userName=temp.name;

            this.isLoggedIn = true;

            if(this.user.permission=="2")
                      this.router.navigateByUrl('/voting');
                  
            else if(this.user.permission=="1")
                       this.router.navigateByUrl('/home');
          }
    });
  });
      this.Service.allSubscribe.push(temp1);

}

}