
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

//===============================  ProjectForSelect class  ========================================

export class ProjectForSelectComponent implements OnInit 
{
  @Input() item;
  @Output() voteChoose: EventEmitter<any> = new EventEmitter();

  //user details
  user = { id: null, permission: null, community: null, name: null, email: null };

  // variables
  projectName: string;
  projectUplodeDate: Date;

  // pointers to object or list in firebase
  pointerToProjectInAF: any;
  pointerToProjectObjectInAF: FirebaseObjectObservable<any>;

  //===================================  constructor  ============================================

  constructor( private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {  
    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.getDetails(this.user);    
  }

  //====================================  ngOnInit  ============================================

  ngOnInit() 
  {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF = this.af.object(this.item, {preserveSnapshot: true});
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1];

    // (<any>$(".stopper")).each(function (k, v) {
    //   (<any>$(v)).countdown(v.dataset.date, function(event) {
    //     $(this).text(event.strftime('%D days %H:%M:%S'));
    //   });
    // });
  }

  //===================================  leftDayFn  ============================================

   leftDayFn(projectUplodeDate)
  {
    // console.log(projectUplodeDate);
    // if (projectUplodeDate)
    // {
    //   var timeDiff = Math.abs(projectUplodeDate.getTime() - new Date().getTime());
    //   this.leftDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // }
    // console.log(this.leftDay);
    return true;
  }

}
