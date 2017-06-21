import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//========================= HomeComponent class ==================================================================

export class HomeComponent implements OnInit 
{
  adcommunity: string;
  community: string;
  communitiesFBList: FirebaseListObservable<any>;
  adcommunityFBList: FirebaseListObservable<any>;
  usersArr: any;
  usersFBList: any;
  whatToDrop:any;
  doesNeedPop: boolean;
  whatToPop: string;
  //=========================  constructor  =====================================================================

  constructor( private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {
    this.communitiesFBList = this.af.list('communities',{ preserveSnapshot: true });
    this.adcommunityFBList = this.af.list('communities');
    this.usersFBList = this.af.list('users');
    this.adcommunity = '';
    this.whatToDrop="";
    this.doesNeedPop=false;
    this.whatToPop="";

    let temp = this.usersFBList.subscribe((snapshots)=>
    {
      this.usersArr = [];
      snapshots.forEach(snapshot => 
      {
        this.usersArr.push(snapshot);
      });
    })
      this.service.allSubscribe.push(temp);

  }

  //==========================  ngOnInit  =======================================================================
  
  ngOnInit() 
  {
    this.service.setTitle("Home");
  }

  //========================== addCommunity ======================================================================

  addCommunity() 
  {
    if (this.adcommunity == '') 
    {
      alert('Enter a community name');
      return;
    }
    else if (!this.doesCommunityExist()) 
    {
      this.communitiesFBList.update(this.adcommunity, {name: this.adcommunity});
      //this.communitiesFBList.push({ name: this.adcommunity });
      alert('Community is added');
    }
    else 
    {
      alert('This community already exists');
    }
          this.adcommunity = '';
  }

  //====================== doesCommunityExist =====================================================================

  doesCommunityExist() 
  {
    let status = false;
    let temp = this.communitiesFBList.subscribe((snapshots) => 
    {
      snapshots.some(snapshot => 
      {        
        if (snapshot.val().name == this.adcommunity) 
          status=true;
      });
    });

    this.service.allSubscribe.push(temp);

    return status;
  }

//====================== deleteCommunity =====================================================================

  deleteCommunity(communityKey: string) 
  {
  this.doesNeedPop=false;
  this.whatToDrop="";
  const itemObservable = this.af.object("communities/" + communityKey);
  itemObservable.remove();

  let temp = this.usersFBList.subscribe((snapshots)=>
    {
      snapshots.forEach(snapshot => 
      {
        if(snapshot.associatedCommunity==communityKey)
              this.deleteUser(snapshot);
            
            
      });
    })
      this.service.allSubscribe.push(temp);

  }

//====================== deleteUser =====================================================================

  deleteUser(user) 
  {
  this.doesNeedPop=false;
  this.whatToDrop="";
  let userKey = user.$key; 
  const itemObservable = this.af.object("users/" + userKey);
  itemObservable.remove();

  }

//====================== showDropdow =====================================================================

  showDropdow(user)
  {
    if(this.whatToDrop==user)
        this.whatToDrop="";

    else this.whatToDrop=user;
  }
  



PopMassage(pop:string)
{
  this.whatToPop=pop;
  this.doesNeedPop =!this.doesNeedPop;
}



}













/*

What we do with Yonatan:
on SubmitProjectComponent.ts:

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";


@Component({
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.css']
})
export class SubmitProjectComponent implements OnInit {
public projects: FirebaseListObservable<any>;
public newProject: string;
  constructor( router: Router, public af: AngularFireDatabase)
   {
  this.projects = this.af.list('projects'); //= select * from projects 

    this.projects.push({game:{goal:'great'}}); //= select * from projects 
 this.projects.lift
    //this.newProject = '';
    }

  ngOnInit() {
  }

}





*/
