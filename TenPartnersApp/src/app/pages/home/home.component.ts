import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  community: string;
  communities: FirebaseListObservable<any>;

  constructor(private router: Router, private serviceService: ServiceService, public af: AngularFireDatabase) {

    this.communities = this.af.list('communities',{ preserveSnapshot: true });
    this.community = '';
  }

  ngOnInit() {
    this.serviceService.setTitle("Home");
  }

  addCommunity() {
    if (this.community == '') {
      alert('Enter a community name');
      return;
    } else if (!this.doesCommunityExist()) {
      this.communities.push({ name: this.community });
      alert('Community is added');
    } else {
      alert('This community already exists');
    }
          this.community = '';

  }

  doesCommunityExist() {
    let status = false;
    this.communities.subscribe((snapshots) => {
      snapshots.some(snapshot => {        
        if (snapshot.val().name == this.community) {
          //        alert('This community already exists');
          //        this.community = '';
          status=true;
          return true;
        }
      });
    })
    return status;

  }



}

/*

What we do with Yonatan:
on SubmitProjectComponent.ts:

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";


@Component({
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.css']
})
export class SubmitProjectComponent implements OnInit {
public projects: FirebaseListObservable<any>;
public newProject: string;
  constructor(private router: Router, public af: AngularFireDatabase)
   {
  this.projects = this.af.list('projects'); //= select * from projects 

    this.projects.push({game:{goal:'great'}}); //= select * from projects 
 this.projects.lift
    //this.newProject = '';
    }

  ngOnInit() {
  }

}





*/
