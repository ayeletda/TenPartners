import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectForSelect',
  templateUrl: './projectForSelect.component.html',
  styleUrls: ['./projectForSelect.component.css']
})

export class ProjectForSelectComponent implements OnInit 
{
   for : number = 0;
   avoidance : number = 10;
   against : number = 0;
   numOfVotingLabel : number = 0;
   votingFor: boolean = false;
   votingFirstTime: boolean = true; // saves if it the first time that person voting (true) or not (false)

  constructor(private router: Router) { }

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