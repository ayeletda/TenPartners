import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.css']
})

//======================  SubmitProject class  ============================================================

export class SubmitProjectComponent implements OnInit
{
  //project details
  name: string;
  description: String;
  purpose: String;
  projectsValues_Arr: any;

  //pointers of object or list in firebase
  projectsFBList: FirebaseListObservable<any>;
  messagesFBList: FirebaseListObservable<any>;

//===========================  constructor  ====================================================================

  constructor( private service: ServiceService, private router: Router, private af: AngularFireDatabase) 
  {
    //initializes with defult values
    this.name = "";
    this.description = "";
    this.purpose = "";

    //initialize projectsValues_Arr
    this.projectsFBList = this.af.list('projects');

    let temp = this.projectsFBList.subscribe((snapshots)=>
    {
      this.projectsValues_Arr=[];
      snapshots.forEach(snapshot => 
      {
        this.projectsValues_Arr.push(snapshot);
      });
    });

    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
    this.service.allSubscribe.push(temp);
  }

  //==========================  ngOnInit  ====================================================================

  ngOnInit() 
  {
    this.service.setTitle("Submit Project");
  }

  //==========================  sendProject  ====================================================================

  sendProject()
  {
    if(this.name == "" || this.description == "" || this.purpose == "")
        alert("You must fill out all fields before submitting a project.");
    else 
    {
      this.projectsFBList.push({name: this.name, description: this.description,purpose: this.purpose,associatedCommunities: "NULL"});
      this.name = '';
      this.description = "";
      this.purpose = "";
       alert("Your project was send!");
    }
  }

}
