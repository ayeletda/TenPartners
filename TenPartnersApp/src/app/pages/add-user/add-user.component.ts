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
  //the page's title
  title: string;

  public UserName: string;
  public Community: string;
  public TenPartnersAccount: string;
  public Password: string;
  public GoogleAccount: String;
  public FacebookAccount: String;
  public TwitterAccount: String;
  public Permission: number;
  public whatToPop:string;
  public showDetailsForm: boolean;

  users: FirebaseListObservable<any>;
  communities: FirebaseListObservable<any>;

  // projects: FirebaseListObservable<any>;
  // projectsValues_Arr: any;
  // public messages: FirebaseListObservable<any>;

  constructor(private router: Router, private serviceService: ServiceService, private af: AngularFireDatabase)
  {
    this.title = "Add user";

    this.whatToPop="";
    this.showDetailsForm=false;
    this.UserName = "";
    this.TenPartnersAccount = "";
    this.Password = "";
    this.GoogleAccount = "";
    this.FacebookAccount = "";
    this.TwitterAccount = "";
    this.Permission = null;
    this.users = this.af.list('users');
    this.communities = this.af.list('communities');
  }

  ngOnInit()
  {
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
        permission: this.Permission}).then(() => {
      
          this.UserName = "";
          this.Permission = null;
          this.TenPartnersAccount = "";
          this.Password = "";
          this.FacebookAccount = "";
          this.GoogleAccount = "";
          this.TwitterAccount = "";
        });
     

    

     
    }


    else {
      this.whatToPop="fieldEmptyPop";
     this.showDetailsForm=true;
    }


  }


PopMassage()
{
  this.showDetailsForm =!this.showDetailsForm;
}


}
