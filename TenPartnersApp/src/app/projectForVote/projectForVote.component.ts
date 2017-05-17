import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectForVote',
  templateUrl: './projectForVote.component.html',
  styleUrls: ['./projectForVote.component.css']
})

export class ProjectForVoteComponent implements OnInit 
{
   for : number;
   avoidance : number;
   against : number;
   numOfVotingLabel : number;
   votingFor: boolean;
   votingFirstTime: boolean; // saves if it the first time that person voting (true) or not (false)

  constructor(private router: Router)
  {
    this.for = 0;
    this.avoidance =  10;
    this.against = 0;
    this.numOfVotingLabel = 0;
    this.votingFor = false;
    this.votingFirstTime = true;
  }

  ngOnInit() {}

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