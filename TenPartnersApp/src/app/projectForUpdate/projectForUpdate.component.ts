import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";


@Component({
  selector: 'app-projectForUpdate',
  templateUrl: './projectForUpdate.component.html',
  styleUrls: ['./projectForUpdate.component.css']
})


export class ProjectForUpdateComponent implements OnInit, AfterViewChecked
{
    public projects: FirebaseListObservable<any>;

  constructor(private router: Router, public af: AngularFireDatabase)
  {
    this.projects=this.af.list('projects')
  }

  ngOnInit() {}

 clickOnMyProjects(event)
  {
    this.router.navigateByUrl('/'+event.currentTarget.id);
  }

 ngAfterViewChecked() 
  {
    // this.scrollToBottom();
  }
}