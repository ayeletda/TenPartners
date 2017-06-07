
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";

@Component(
{
  selector: 'app-projectForVote',
  templateUrl: './projectForVote.component.html',
  styleUrls: ['./projectForVote.component.css']
})

export class ProjectForVoteComponent implements OnInit, AfterViewChecked
{
  @Input() item;
  @ViewChild('forVal') private forVal: any;
  @ViewChild('avoidVal') private avoidVal: any;
  @ViewChild('againstVal') private againstVal: any;

  votingFor: boolean;
  votingAgainst: boolean;
  votingFirstTime: boolean; // saves if it the first time that person voting (true) or not (false)
  private projects: FirebaseListObservable<any>;
  private pointerToProjectInAF: any;
  pointerToProjectObjectInAF: FirebaseObjectObservable<any>;
  projectName: string;
  projectUplodeDate: Date;
  leftDay: any;
  projectDate: Date;

  @Output() voteChoose: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private af: AngularFireDatabase) 
  {
    this.votingFirstTime = true;
    this.projects = this.af.list('projects');
  }

  ngOnInit() {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1]

    for (let value of this.pointerToProjectInAF)
      if (value.$key == 'date')
      {
        this.projectUplodeDate = value.$value;

      }
 
    if (this.projectUplodeDate) {
     var timeDiff = Math.abs(this.projectUplodeDate.getTime() - new Date().getTime());
     this.leftDay = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }
  }


  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  vote(against: boolean) {
    this.votingFirstTime = false;
    if (against)
      this.votAgainst();
    else
      this.votFor();
  }


  votFor() 
  {
    this.votingFor = true;
    this.votingAgainst = false;

    let value = parseInt(this.forVal.nativeElement.innerText) + 1;
    this.pointerToProjectObjectInAF.update({ 'for': value }).then(
      x => {
        console.log('update done');  
          }
    );
        this.votingFor = true;
    this.votingAgainst = false;

    // updates against or avoid
    if (!this.votingFirstTime) {
      value = parseInt(this.againstVal.nativeElement.innerText) - 1;
      this.pointerToProjectObjectInAF.update({ 'against': value });
    }
    else {
      value = parseInt(this.avoidVal.nativeElement.innerText) - 1;
      // this.pointerToProjectObjectInAF.update({ 'avoid': value }).then(resolve => {
      //   // this.voteChoose.emit();    

      // });
    }


    // updates the flages.

  }

  votAgainst() {
    this.votingFor = false;
    this.votingAgainst = true;
    
    
    // updates the "against" val
    var value = parseInt(this.againstVal.nativeElement.innerText) + 1;
    this.pointerToProjectObjectInAF.update({ 'against': value });

    // updates for or avoid
    if (!this.votingFirstTime) {
      var value = parseInt(this.forVal.nativeElement.innerText) - 1;
      this.pointerToProjectObjectInAF.update({ 'for': value });
    }
    else {
      var value = parseInt(this.avoidVal.nativeElement.innerText) - 1;
      this.pointerToProjectObjectInAF.update({ 'avoid': value });
    }
  }

}