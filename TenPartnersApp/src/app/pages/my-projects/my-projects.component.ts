
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
  private user = { id: null, permission: null, community: null, name: null, email: null };

  // project's details
  private currentProject: any;
  private projectPath: any;
  private projectsValues_Arr: any;
  private projectsAssociatedCommunities_Arr: any;

  // pointers of object or list in firebase
  private projectsFBList: FirebaseListObservable<any>;

  // flags
  private noProjects: boolean;
  private isThereProjects: boolean;

  //===============================================  contructor  ====================================================================

  constructor(private router: Router,private service:ServiceService, public af: AngularFireDatabase) 
  {
    //initializes with defult values
    this.currentProject = '';
    this.projectPath = '';
    this.noProjects= true;
    this.isThereProjects = false;
    
    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.getDetails(this.user);

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

  private saveProjectPath(project, i)
  {
    this.projectPath = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
    this.noProjects = false;
    return true;
  }

  //=============================================  updateThereIsProjectsFlag  ==============================================================

  private updateThereIsProjectsFlag(bol)
  {
    this.isThereProjects = bol;
    return true;
  }
}
  