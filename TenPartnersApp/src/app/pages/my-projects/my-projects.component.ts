
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})

export class MyProjectsComponent implements OnInit 
{
  // variabels
  userId: string;
  userCommunity: string;
  currentProject: any;
  projectPath: any;
  thereIsProjects: boolean;

  // pointers to object or list in firebase
  user: FirebaseListObservable<any>;         // pointer to user's object
  projects: FirebaseListObservable<any>;
  projectsValues_Arr: any;
  projectsAssociatedCommunities_Arr: any;

  constructor(private router: Router,private service:ServiceService, public af: AngularFireDatabase) 
  {
    this.userId = this.service.getCurrentID();
    this.user = this.af.list('users/' + this.userId); // the specific user
    this.currentProject = '';
    this.projectPath = '';
    this.thereIsProjects = false;
    
    this.user.subscribe((snapshots)=>
    {
      snapshots.forEach(snapshot =>
      {
        if (snapshot.$key == 'associatedCommunity')
          this.userCommunity = snapshot.$value;
      });
    })

    this.projects = this.af.list('projects');

    this.projects.subscribe((snapshots)=>
    {
      this.projectsAssociatedCommunities_Arr = [];
      this.projectsValues_Arr = [];
     
      snapshots.forEach(snapshot => 
      {
        this.projectsAssociatedCommunities_Arr.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
        this.projectsValues_Arr.push(snapshot);
      });
    })

  }

  ngOnInit() 
  {
    this.service.setTitle("My Projects");
  }

  saveProjectPath(project, i)
  {
    this.projectPath = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
    return true;
  }

  updateThereIsProjectsFlag(bol)
  {
    this.thereIsProjects = bol;
  }
}
  