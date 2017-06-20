
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";


@Component(
    {
      selector: 'app-projectForSelect',
      templateUrl: './projectForSelect.component.html',
      styleUrls: ['./projectForSelect.component.css']
    })

export class ProjectForSelectComponent implements OnInit, AfterViewChecked {
  @Input() item;
  @ViewChild('forVal') private forVal: any;
  @ViewChild('avoidVal') private avoidVal: any;
  @ViewChild('againstVal') private againstVal: any;

  votingFor: boolean;
  votingFirstTime: boolean; // saves if it the first time that person voting (true) or not (false)
  private projects: FirebaseListObservable<any>;
  private pointerToProjectInAF: any;
  pointerToProjectObjectInAF: any;
  projectName: string;
  projectUplodeDate: Date;
  leftDay: any;
  projectDate: Date;



  @Output() voteChoose: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private af: AngularFireDatabase) {

    this.projects = this.af.list('projects');
    (<any>$(".stopper")).each(function (k, v) {
     (<any>$(v)).countdown(v.dataset.date, function(event) {
         $(this).text(event.strftime('%D :%H:%M:%S'));
       });
     });
  }


  ngOnInit() {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1];
/*
(<any>$(".stopper")).each(function (k, v) {
     (<any>$(v)).countdown(v.dataset.date, function(event) {
         $(this).text(event.strftime('%D :%H:%M:%S'));
       });
     });
*/
 //   for (let value of this.pointerToProjectInAF)
  //    if (value.$key == 'date')
    //    this.projectUplodeDate = value.$value;
 ;
    // console.log(this.projectUplodeDate);//????????????????????
    //  var timeDiff = Math.abs(this.projectUplodeDate.getTime() - new Date().getTime());
    //  this.leftDay = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }


  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  votFor() {
    // updates the "for" val



    let value = parseInt(this.forVal.nativeElement.innerText) + 1;
    this.pointerToProjectObjectInAF.update({ 'for': value });

    // updates against or avoid
    if (!this.votingFirstTime) {
      value = parseInt(this.againstVal.nativeElement.innerText) - 1;
      // this.pointerToProjectObjectInAF.update({ 'against': value });
    }
    else {
      value = parseInt(this.avoidVal.nativeElement.innerText) - 1;
      // this.pointerToProjectObjectInAF.update({ 'avoid': value }).then(resolve => {
      //   // this.voteChoose.emit();    

      // });
    }

    this.votingFirstTime = false;
    this.votingFor = true;

    // updates the flages.

  }

  votAgainst() {
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

    // updates the flages.
    this.votingFirstTime = false;
    this.votingFor = false;
  }

}
