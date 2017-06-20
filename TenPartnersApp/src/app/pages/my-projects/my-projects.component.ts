
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, Directive } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})

//=============================================  MyProjects class  ============================================================

export class MyProjectsComponent implements OnInit 
{
  // user's details
  user;

  // project's details
  currentProject: any;
  projectPath: any;
  projectsValues_Arr: any;
  projectsAssociatedCommunities_Arr: any;

  // pointers of object or list in firebase
  projectsFBList: FirebaseListObservable<any>;

  // flags
  isNoProjects: boolean;
  isThereProjects: boolean;

  //===============================================  contructor  ====================================================================

  constructor( private router: Router,  private service:ServiceService, private af: AngularFireDatabase) 
  {
    //initializes with defult values
    this.currentProject = '';
    this.projectPath = '';
    this.isNoProjects= true;
    this.isThereProjects = false;
    
    //function (in servic.component.ts) that returns a pointer to user object that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.user = this.service.getUser();

    //initializes arrays
    this.projectsFBList = this.af.list('projects');

    let temp2 = this.projectsFBList.subscribe((snapshots)=>
    {
      this.projectsAssociatedCommunities_Arr = [];
      this.projectsValues_Arr = [];
     
      snapshots.forEach(snapshot => 
      {
        this.projectsAssociatedCommunities_Arr.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
        this.projectsValues_Arr.push(snapshot);
      });
    });

    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
    this.service.allSubscribe.push(temp2);

  }

  //=====================================================  ngOnInit  ================================================================

  ngOnInit() 
  {
    this.service.setTitle("My Projects");
  }

  //=================================================== saveProjectPath  ============================================================

  saveProjectPath(project, i)
  {
    this.projectPath = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
    this.isNoProjects = false;
    return true;
  }

  //=============================================  updateThereIsProjectsFlag  ==============================================================

  updateThereIsProjectsFlag(bol)
  {
    this.isThereProjects = bol;
    return true;
  }
}
  