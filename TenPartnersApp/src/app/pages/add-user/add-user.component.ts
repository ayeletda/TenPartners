import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit 
{
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

  constructor(private router: Router, private serviceService: ServiceService, private af: AngularFireDatabase)
  {
    this.UserName = "";
    this.TenPartnersAccount = "";
    this.Password = "";
    this.GoogleAccount = "";
    this.FacebookAccount = "";
    this.TwitterAccount = "";
    this.Permission = "";
    this.users = this.af.list('users');
    this.communities = this.af.list('communities');

  }

  ngOnInit()
  {
    this.serviceService.setTitle("Add user");
  }

  sendUser(community) {
    this.Community = community;
    if (this.UserName != "" && this.TenPartnersAccount != "" && this.Password != "" && this.Community) {
      //      if (this.checkUserName()==true)
      //        alert("this username already exist");



      this.serviceService.registerUsers(this.TenPartnersAccount, this.Password);
      this.users = this.af.list('users');
      this.users.push({
        name: this.UserName + "", email: this.TenPartnersAccount + "", facebook: this.FacebookAccount + "",
        google: this.GoogleAccount + "", twitter: this.TwitterAccount + "", associatedCommunity: this.Community + "",
        permission: this.Permission + ""
      });

      alert("The user is added");

      this.UserName = "";
      this.Permission = "";
      this.TenPartnersAccount = "";
      this.Password = "";
      this.FacebookAccount = "";
      this.GoogleAccount = "";
      this.TwitterAccount = "";
    }


    else alert("something's missing");


  }

}
