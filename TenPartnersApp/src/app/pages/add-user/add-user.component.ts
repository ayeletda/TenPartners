import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public UserName: string;
  public Community: string;
  public TenPartnersAccount: string;
  public Password: string;
  public GoogleAccount: String;
  public FacebookAccount: String;
  public TwitterAccount: String;
  public Permission: String;
  users: FirebaseListObservable<any>;
  communities: FirebaseListObservable<any>;

  // projects: FirebaseListObservable<any>;
  // projectsValues_Arr: any;
  // public messages: FirebaseListObservable<any>;

  constructor(private router: Router, private serviceService: ServiceService, public af: AngularFireDatabase) {
    this.UserName = "";
    //    this.Community="";
    this.TenPartnersAccount = "";
    this.Password = "";
    this.GoogleAccount = "";
    this.FacebookAccount = "";
    this.TwitterAccount = "";
    this.users = this.af.list('users');
    this.communities = this.af.list('communities');

  }

  ngOnInit() {
    this.serviceService.setTitle("Add user");
  }

  sendUser() {

    if (this.UserName != "" && this.TenPartnersAccount != "" && this.Password != "" && this.Community != "Community") {
      //      if (this.checkUserName()==true)
      //        alert("this username already exist");
      


      this.serviceService.registerUsers(this.TenPartnersAccount, this.Password);
      this.users.push({
        name: this.UserName, email: this.TenPartnersAccount, facebook: this.FacebookAccount,
        google: this.GoogleAccount, twitter: this.TwitterAccount, associatedCommunity: this.Community,
        permission: this.Permission
      });

      alert("user is saved");

      this.UserName = "";
      this.Permission = "";
      this.TenPartnersAccount = "";
      this.Password = "";
      this.FacebookAccount = "";
      this.GoogleAccount = "";
      this.TwitterAccount = "";
      this.Community = "";
    }

    /*
      checkUserName(){
      var status=false;
      this.users.subscribe(snapshots => {
        snapshots.some(snapshot => {
          console.log(snapshot.val().mail);
          var temp=snapshot.val();      
          if(this.userEmail==temp.email||this.userEmail==temp.google||this.userEmail==temp.facebook)
            {
              console.log("hereee");
              this.permission=temp.permission;
              this.community=temp.associatedCommunity;
              this.userName=temp.name;
              status =true;
              return status;
            }
          });
        });
        return status;
      }
    */
    else alert("something's missing");


  }

  sendProject() {
    /*    console.log("hrhr "+ this.Name + this.Description+this.Purpose);
    
        if(this.Name==""||this.Description==""||this.Purpose=="")
            alert("something's missing");
    
        else {
          this.projects.update(this.Name ,{name: this.Name, description: this.Description,purpose: this.Purpose,associatedCommunities: "NULL"});
          this.Name = '';
          this.Description="";
          this.Purpose="";
           alert("your project send!");
          }
    */
  }
}
