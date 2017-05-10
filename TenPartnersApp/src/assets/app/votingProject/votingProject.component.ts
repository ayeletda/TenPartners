import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votingProject',
  templateUrl: './votingProject.component.html',
  styleUrls: ['./votingProject.component.css']
})

export class VotingProjectComponent implements OnInit 
{
   for : number = 0;
   avoidance : number = 10;
   against : number = 0;
   numOfVotingLabel : number = 0;
   madeDesiciion: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {}

  votUp() {
    this.for++;
    this.madeDesiciion = !this.madeDesiciion;
  }

  votDown(){
    this.for--;
    this.against++;
    this.madeDesiciion = !this.madeDesiciion;
  }
}