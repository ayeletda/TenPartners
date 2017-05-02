import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voating',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})

export class VotingComponent implements OnInit 
{
   for : number = 0;
   avoidance : number = 10;
   against : number = 0;
   numOfVotingLabel : number = 0;

  constructor(private router: Router) { }

  ngOnInit() {}


}


var addProject=function()
{
//  numOfVotingLabel = 1;

}
