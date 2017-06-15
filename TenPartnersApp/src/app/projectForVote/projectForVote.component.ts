
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
  
  // variables
  private projectName: string;
  private projectDate: Date;
  private projectUplodeDate: Date;
  private leftDays: number;
  private userId: any;
  private voteStatus: string;

  //determined according to customer
  private votingNumForChoosingProject: number; 
  private maxVotingNum: number;         
  private maxDaysForVoting: number;

  // pointers to object or list in firebase
  private pointerToProjectInAF: any;
  private pointerToProjectObjectInAF: FirebaseObjectObservable<any>;
  private projects: FirebaseListObservable<any>;
  private usersVotingList: FirebaseListObservable<any>;
  
  //flags
  private isAccuciatedUser: boolean;

  //===================================  constructor  ============================================

  constructor(private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {
    //initializes variables with deafult values
    this.projectName = '';
    this.projectDate = null;
    this.projectUplodeDate = null;
    this.leftDays = -1;
    this.voteStatus = '';
    this.pointerToProjectInAF = null;
    this.pointerToProjectObjectInAF = null;
    this.usersVotingList = null;

    //initializes variables with corrent values
    this.projects = this.af.list('projects');
    this.votingNumForChoosingProject = 7;
    this.maxVotingNum = 10;
    this.maxDaysForVoting = 14;
    this.userId = this.service.getCurrentID();
    
  }

  //====================================  ngOnInit  ============================================

  ngOnInit() 
  {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1];
    this.usersVotingList = this.af.list(this.item + "/votingList");

    let accociatedUser ='';
    let temp = this.pointerToProjectInAF.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => 
      {
        if (snapshot.$key == 'associatedUser')
          accociatedUser = snapshot.$value;
      });
    });

    this.service.allSubscribe.push(temp);

    this.isAccuciatedUser = this.userId == accociatedUser ? true : false;

    this.setUserVotingStatus();
  }

  //====================================  userVotingStatu  ============================================

  setUserVotingStatus()
  {
   let temp= this.usersVotingList.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => {
        if (snapshot.$key == this.userId)
          this.voteStatus = snapshot.vote;
      });
    });

        this.service.allSubscribe.push(temp);

  }

  //===================================  updateLeftDays  =========================================

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
    this.pointerToProjectObjectInAF.update({ 'for': forVal });
    this.pointerToProjectObjectInAF.update({ 'avoid': avoidVal });
    this.pointerToProjectObjectInAF.update({ 'against': againstVal });

    //updating voteStatus on firebase
    this.usersVotingList.update(this.userId, { vote: newStatus});
  }

  //====================================  removeProject  =========================================

  removeProject( deleteMessage )
  {
    //removes the project from the voting list
    this.pointerToProjectObjectInAF.update({ 'associatedUser': '' });

    //message that a project was rejected
    let txt = 'The project "'+ this.projectName +'"' + deleteMessage;
    alert(txt);
  }

}