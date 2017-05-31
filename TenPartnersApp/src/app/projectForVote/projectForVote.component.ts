
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'app-projectForVote',
  templateUrl: './projectForVote.component.html',
  styleUrls: ['./projectForVote.component.css']
})

export class ProjectForVoteComponent implements OnInit , AfterViewChecked
{
   for : number;
   avoidance : number;
   against : number;
   numOfVotingLabel : number;
   votingFor: boolean;
   votingFirstTime: boolean; // saves if it the first time that person voting (true) or not (false)
  public projects: FirebaseListObservable<any>;

  constructor(private router: Router, public af: AngularFireDatabase)
  {
    this.for = 0;
    this.avoidance =  10;
    this.against = 0;
    this.numOfVotingLabel = 0;
    this.votingFor = false;
    this.votingFirstTime = true;
    this.projects=this.af.list('projects')  
}

  ngOnInit() {}


 ngAfterViewChecked() 
  {
    // this.scrollToBottom();
  }
  
  votFor() 
  {
    this.for++;

    if(!this.votingFirstTime)
      this.against--;
    else
      this.avoidance--;
    
    this.votingFirstTime = false;
    this.votingFor = true;
  }

  votAgainst()
  {
    this.against++;

    if(!this.votingFirstTime)
      this.for--;
    else
      this.avoidance--;
    
    this.votingFirstTime = false;
    this.votingFor = false;
  }
}