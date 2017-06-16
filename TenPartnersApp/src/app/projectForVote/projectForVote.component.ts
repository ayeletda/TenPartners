
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
  @Output() voteChoose: EventEmitter<any> = new EventEmitter();

  @ViewChild('forVal') private forVal: any;
  @ViewChild('avoidVal') private avoidVal: any;
  @ViewChild('againstVal') private againstVal: any;
  
  //user details
  private user = { id: null, permission: null, community: null, name: null, email: null };
  private voteStatus: string;

  //project details
  private projectName: string;
  private projectDate: Date;
  private projectUplodeDate: Date;
  private leftDays: number;

  //determined according to customer
  private votingNumForChoosingProject: number; 
  private maxVotingNum: number;         
  private maxDaysForVoting: number;

  //pointers to object or list in firebase
  private projectFBList: any;
  private projectFBObject: FirebaseObjectObservable<any>;
  private projectsFBList: FirebaseListObservable<any>;
  private usersVotingFBList: FirebaseListObservable<any>;
  
  //flags
  private isAccuciatedUser: boolean;

  //===================================  constructor  ============================================

  constructor(private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {
    //initializes variables with deafult values
    // this.projectName = '';
    // this.projectDate = null;
    // this.projectUplodeDate = null;
    // this.leftDays = -1;
    // this.voteStatus = '';
    // this.projectFBList = null;
    // this.projectFBObject = null;
    // this.usersVotingFBList = null;

    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.getDetails(this.user);
   console.log(this.user.id);


    //initializes variables with corrent values
    this.projectsFBList = this.af.list('projects');
    this.votingNumForChoosingProject = 7;
    this.maxVotingNum = 10;
    this.maxDaysForVoting = 14;    
  }

  //====================================  ngOnInit  ============================================

  ngOnInit() 
  {
    //initializes FB objects & lists
    this.projectFBList = this.af.list(this.item); // item is a path
    this.projectFBObject = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.projectFBList.$ref.path.o[1];
    this.usersVotingFBList = this.af.list(this.item + "/votingList");

    //initializes accociatedUser
    let accociatedUser ='';
    let temp = this.projectFBList.subscribe(snapshots => 
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
    if (projectUplodeDate) 
    {
      let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds    
      let timeDiff = Math.abs(projectUplodeDate - new Date().getTime());
      this.leftDays = this.maxDaysForVoting - (Math.ceil(timeDiff /oneDay)-1);

      if(this.leftDays == 0)
        this.removeProject("passed his voting time and therefore was deleted.");  
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
      this.removeProject(" was selected!");

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
      this.removeProject( " was rejected by all of the team and therefore was deleted." );

    // updates for or avoid
    if ( this.voteStatus == "for")
      forVal = forVal - 1;
    else
      avoidVal = avoidVal- 1;

    //calling to a function that updating the voting's vars & voteStatus on firebase
    this.updateVotingVarsAndVoteStatus(forVal, avoidVal, againstVal, newStatus);
  }

  //===========================  updateVotingVarsAndVoteStatus  =========================================
  //updating the voting's vars & voteStatus on firebase
  
  updateVotingVarsAndVoteStatus(forVal, avoidVal, againstVal, newStatus)
  {
    //updating voting's vars on firebase
    this.projectFBObject.update({ 'for': forVal });
    this.projectFBObject.update({ 'avoid': avoidVal });
    this.projectFBObject.update({ 'against': againstVal });
console.log(this.user.id +" statuse: "+ newStatus);

    //updating voteStatus on firebase
    this.usersVotingFBList.update(this.user.id, { vote: newStatus });
  }

  //====================================  removeProject  =========================================

  removeProject( deleteMessage )
  {
    //removes the project from the voting list
    this.projectFBObject.update({ 'associatedUser': '' });

    //message that a project was rejected
    let txt = 'The project "'+ this.projectName +'"' + deleteMessage;
    alert(txt);
  }

}