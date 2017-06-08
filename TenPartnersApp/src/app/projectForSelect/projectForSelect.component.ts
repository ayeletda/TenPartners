
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";
import { ServiceService } from '../service.service';


@Component(
    {
      selector: 'app-projectForSelect',
      templateUrl: './projectForSelect.component.html',
      styleUrls: ['./projectForSelect.component.css']
    })

export class ProjectForSelectComponent implements OnInit {
  @Input() item;
  @Output() voteChoose: EventEmitter<any> = new EventEmitter();

  @ViewChild('forVal') private forVal: any;
  @ViewChild('avoidVal') private avoidVal: any;
  @ViewChild('againstVal') private againstVal: any;

  // flags
  private votingFor: boolean;
  private votingAgainst: boolean;

  // variables
  private projectName: string;
  private projectDate: Date;
  private projectUplodeDate: Date;
  private leftDay: any;
  private votingNumForChoosingProject: Number;  //determined according to customer
  private maxVotingNum: Number;               //determined according to customer
  private userId: any;
  private voteStatus: string;

  // pointers to object or list in firebase
  private pointerToProjectInAF: any;
  private pointerToProjectObjectInAF: FirebaseObjectObservable<any>;
  private projects: FirebaseListObservable<any>;
  private usersVotingList: FirebaseListObservable<any>;

  //===================================  constructor  ============================================

  constructor(private router: Router, private service: ServiceService, private af: AngularFireDatabase) {
    this.projects = this.af.list('projects');
    this.votingNumForChoosingProject = 7;
    this.maxVotingNum = 10;
    this.votingFor = false;
    this.votingAgainst = false;
    this.userId = this.service.getCurrentID();
  }

  //====================================  ngOnInit  ============================================

  ngOnInit() {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF = this.af.object(this.item, {preserveSnapshot: true});
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1];
    this.usersVotingList = this.af.list(this.item + "/votingList");

    this.userVotingStatus();
  }

  leftDayFn(projectUplodeDate) {
    // console.log(projectUplodeDate);
    // if (projectUplodeDate)
    // {
    //   var timeDiff = Math.abs(projectUplodeDate.getTime() - new Date().getTime());
    //   this.leftDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // }
    // console.log(this.leftDay);
    return true;
  }

  //=====================================  votFor  ============================================

  votFor() {
    let lastStatus = this.voteStatus;

    //updates "for"
    let value = parseInt(this.forVal.nativeElement.innerText) + 1;

    this.pointerToProjectObjectInAF.update({'for': value}).then(() => {
      this.usersVotingList.update(this.userId, {vote: "for"});
    });

    //if a project was selected
    if (value == this.votingNumForChoosingProject) {
      //removes the project from the voting list
      this.pointerToProjectObjectInAF.update({'associatedUser': ''});

      //message that a project was selected
      let txt = 'The project "' + this.projectName + '" was selected!';
      alert(txt);
    }

    //updates "against" or "avoid"
    if (lastStatus == "against") {
      value = parseInt(this.againstVal.nativeElement.innerText) - 1;
      this.pointerToProjectObjectInAF.update({'against': value})
    }
    else {
      value = parseInt(this.avoidVal.nativeElement.innerText) - 1;
      this.pointerToProjectObjectInAF.update({'avoid': value});
    }
  }

  //===================================  votAgainst  =========================================

  votAgainst() {
    let lastStatus = this.voteStatus;

    // updates the "against" val
    let value = parseInt(this.againstVal.nativeElement.innerText) + 1;
    this.pointerToProjectObjectInAF.update({'against': value}).then(() => {
      this.usersVotingList.update(this.userId, {vote: "against"});
    })

    //if a project was rejected by all of the team
    if (value == this.maxVotingNum) {
      //removes the project from the voting list
      this.pointerToProjectObjectInAF.update({'associatedUser': ''});

      //message that a project was rejected
      let txt = 'The project "' + this.projectName + '" was rejected by all of the team and therefore was deleted.';
      alert(txt);
    }

    // updates for or avoid
    if (lastStatus == "for") {
      value = parseInt(this.forVal.nativeElement.innerText) - 1;
      this.pointerToProjectObjectInAF.update({'for': value});
    }
    else {
      value = parseInt(this.avoidVal.nativeElement.innerText) - 1;
      this.pointerToProjectObjectInAF.update({'avoid': value});
    }
  }

  userVotingStatus() {
    this.usersVotingList.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.$key == this.userId)
          this.voteStatus = snapshot.vote;
      });
    })
  }
}
