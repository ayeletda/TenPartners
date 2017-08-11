

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";
import { ServiceService } from '../service.service';

@Component(
{
  selector: 'app-projectForVote',
  templateUrl: './projectForVote.component.html',
  styleUrls: ['./projectForVote.component.css']
})

export class ProjectForVoteComponent implements OnInit
{
  @Input() item;
  @Output() projectDeleted: EventEmitter<any> = new EventEmitter();

  @ViewChild('forVal')  forVal: any;
  @ViewChild('avoidVal')  avoidVal: any;
  @ViewChild('againstVal')  againstVal: any;
  
  //user details
  user;
  voteStatus: string;

  //project details
  projectName: string;
  projectDate: Date;
  projectUplodeDate: Date;
  leftDays: number;

  //determined according to customer
  votingNumForChoosingProject: number; 
  maxVotingNum: number;         
  maxDaysForVoting: number;

  //pointers to object or list in firebase
  projectInCommunityFBList: any;
  projectInCommunityFBObject: FirebaseObjectObservable<any>;
  projectsFBList: FirebaseListObservable<any>;
  usersVotingFBList: FirebaseListObservable<any>;

  //flags
  isAccuciatedUser: boolean;
  // doesNeedPop: boolean;
  // whatToPop: string;

  //===================================  constructor  ============================================

  constructor( private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {
    //initializes variables with deafult values
    this.projectName = '';
    this.projectDate = null;
    this.projectUplodeDate = null;
    this.leftDays = -1;
    this.voteStatus = '';
    this.projectInCommunityFBList = null;
    this.projectInCommunityFBObject = null;
    this.usersVotingFBList = null;
    // this.whatToPop = '';
    // this.doesNeedPop = false;

    //function (in servic.component.ts) that returns a pointer to user object that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.user = this.service.getUser();

    //initializes variables with corrent values
    this.projectsFBList = this.af.list('projects');
    this.votingNumForChoosingProject = 7;
    this.maxVotingNum = 9;
    this.maxDaysForVoting = 14;    
  }

  //====================================  ngOnInit  ============================================

  ngOnInit() 
  {
    //initializes FB objects & lists
    this.projectInCommunityFBList = this.af.list(this.item); // item is a path
    this.projectInCommunityFBObject = this.af.object(this.item, { preserveSnapshot: true });
    this.usersVotingFBList = this.af.list(this.item + "/votingList");
    
    //initializes projectName
    let projectKey = this.projectInCommunityFBList.$ref.path.o[1];
    let projectFBList = this.af.list("projects/" + projectKey);
    
    let temp0 = projectFBList.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => 
      {
        if (snapshot.$key == 'name')
          this.projectName = snapshot.$value;
      });
    });
    
    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
    this.service.allSubscribe.push(temp0);

    //initializes accociatedUser
    let accociatedUser ='';
    let temp = this.projectInCommunityFBList.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => 
      {
        if (snapshot.$key == 'associatedUser')
          accociatedUser = snapshot.$value;
      });
    });

    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
    this.service.allSubscribe.push(temp);

    this.isAccuciatedUser = this.user.id == accociatedUser ? true : false;

    //initializes voteStatus
    this.setUserVotingStatus();
  }

  //====================================  userVotingStatu  ============================================
    //initializes voteStatus due to votingList in FB

  setUserVotingStatus()
  {
   let temp= this.usersVotingFBList.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => {
        if (snapshot.$key == this.user.id)
          this.voteStatus = snapshot.vote;
      });

    });
    
    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
     this.service.allSubscribe.push(temp);
  }

  //===================================  updateLeftDays  =========================================
// calculates the left day for voting for project

  updateLeftDays(projectUplodeDate)
  {
    // if (projectUplodeDate == '')
      // return;

    if (projectUplodeDate) 
    {
      let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds    
      let timeDiff = Math.abs(projectUplodeDate - new Date().getTime());
      this.leftDays = this.maxDaysForVoting - (Math.ceil(timeDiff /oneDay)-1);

      if(this.leftDays <= 0)
      {
-       this.removeProject("passed his voting time and therefore was deleted.");  
        return;
      }
     }

    // Checking "leftDays" every half hour
    setTimeout(() => {this.updateLeftDays(projectUplodeDate)},432000000);
   
    return true;
  }

  //=====================================  votFor  ============================================

  votFor() 
  {
    let newStatus = "for";
    let forVal = parseInt(this.forVal.nativeElement.innerText) + 1;
    let avoidVal = parseInt(this.avoidVal.nativeElement.innerText);
    let againstVal = parseInt(this.againstVal.nativeElement.innerText);
    
    //if a project was selected
    if(forVal == this.votingNumForChoosingProject)
    {
-     this.removeProject(" was selected!");
      return;
    }

    //updates "against" or "avoid"
    if ( this.voteStatus == "against") 
      againstVal = againstVal - 1;
    else 
      avoidVal = avoidVal - 1;

    //calling to a function that updating the voting's vars & voteStatus on firebase
    this.updateVotingVarsAndVoteStatus(forVal, avoidVal, againstVal, newStatus);
  }

  //===================================  votAgainst  =========================================

  votAgainst() 
  {
    let newStatus = "against";
    let againstVal = parseInt(this.againstVal.nativeElement.innerText) + 1;    
    let forVal = parseInt(this.forVal.nativeElement.innerText);
    let avoidVal = parseInt(this.avoidVal.nativeElement.innerText);

    //if a project was rejected by all of the team
    if(againstVal == this.maxVotingNum)
    {
-     this.removeProject( " was rejected by all of the team and therefore was deleted." );
      return;
    }

    // updates for or avoid
    if ( this.voteStatus == "for")
      forVal = forVal - 1;
    else
      avoidVal = avoidVal- 1;

    //calling to a function that updating the voting's vars & voteStatus on firebase
    this.updateVotingVarsAndVoteStatus(forVal, avoidVal, againstVal, newStatus);
  }

  //===================================  checkVote  =========================================

  checkVote(type, val)
  {
    //if a project was rejected by all of the team
    if(type == 'against' && val == this.maxVotingNum)
      this.removeProject( " was rejected by all of the team and therefore was deleted." );

     //if a project was selected
    if(type == 'for' && val >= this.votingNumForChoosingProject)
-     this.removeProject(" was selected!");


    return true;
  }
  //===========================  updateVotingVarsAndVoteStatus  =========================================
  //updating the voting's vars & voteStatus on firebase
  
  updateVotingVarsAndVoteStatus(forVal, avoidVal, againstVal, newStatus)
  {
    //updating voting's vars on firebase
    this.projectInCommunityFBObject.update({ 'for': forVal });
    this.projectInCommunityFBObject.update({ 'avoid': avoidVal });
    this.projectInCommunityFBObject.update({ 'against': againstVal });

    //updating voteStatus on firebase
    this.usersVotingFBList.update(this.user.id, { vote: newStatus });
  }

  //====================================  removeProject  =========================================

  removeProject( deleteMessage )
  {
    //removes the project from the voting list & reset its messages & votingList
    this.af.list ( this.item + "/messages").remove();
    this.usersVotingFBList = null;
    this.af.list (this.item + "/votingList").remove();
    this.projectInCommunityFBObject.update({ 'cost': '' });
    this.projectInCommunityFBObject.update({ 'date': '' });
    this.projectInCommunityFBObject.update({'associatedUser': ''});
    // this.projectInCommunityFBObject.update({'projectUplodeDate': ''});
    

    //pop message
    let txt = 'The project "'+ this.projectName +'"' + deleteMessage;
 -  alert(txt);

    //tells father that a project was deleted
    this.projectDeleted.emit(); // this.projectDeleted.emit(values)
  }

}