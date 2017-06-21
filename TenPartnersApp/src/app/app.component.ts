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

//========================= AppComponent  class ==========================================
export class AppComponent 
{
  user = {userID: null, permission: null, community: null, userName: null, email: null };
  isLoggedIn: boolean;
  // title;
  //=========================== constructor ===============================================

  constructor(private Service:ServiceService, private router:Router) 
  {
    // this.title = this.Service.getTitle();
    let temp = this.Service.anguarfireAuth.authState.subscribe((auth) => 
    {
      //if the user *didn't* pass the autonomy
      if(auth == null)
      {
        this.isLoggedIn=false;
        this.router.navigate(['']);
      }
      //if the user passed the autonomy
      else
      {
        this.user.userID = auth.uid;
        this.user.email = auth.email;
        this.getDetails();
        this.Service.setEmail(this.user.email);
        this.Service.getDetails();
      }
    });

         this.Service.allSubscribe.push(temp);

  }

  //=========================== getDetails ===============================================

  getDetails()
  {
    let users = this.Service.af.list('/users',{ preserveSnapshot: true });
    
    let temp1 = users.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => 
      {
        let temp = snapshot.val();      
        if(this.user.email == snapshot.val().email)
        {
          this.user.permission = temp.permission;
          this.user.community = temp.associatedCommunity;
          this.user.userName = temp.name;
          this.isLoggedIn = true;

          //if it's admin
          if(this.user.permission == "1")
            this.router.navigateByUrl('/home');

          //if it's authorized user
          else if(this.user.permission == "2")
            this.router.navigateByUrl('/voting');

          //if it's blocked user
          else if(this.user.permission == "3")
            this.router.navigate(['']);;
        }
      });
    });

    this.Service.allSubscribe.push(temp1);
  }

}