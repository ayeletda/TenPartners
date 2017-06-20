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
  whatToPop:string;
  doesNeedPop: boolean;

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
    this.whatToPop="";
    this.doesNeedPop=false;
   
    //initializes projectsValues_Arr
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
  
  //=========================  PopMassage  ====================================================================

  PopMassage()
  {
    if(this.doesNeedPop==false)
    { 
      if(this.name == "" || this.description == "" || this.purpose == "")
        this.whatToPop="fieldEmptyPop";
      else
      {
        this.sendProject();
        this.whatToPop="projectSendPop";
      }  
        this.doesNeedPop=true;
        return;
    }

    this.doesNeedPop =!this.doesNeedPop;
  }

  //==========================  sendProject  ====================================================================

  sendProject()
  {
      this.projectsFBList.push({name: this.name, description: this.description,purpose: this.purpose});
      this.name = '';
      this.description = "";
      this.purpose = "";
  }

}
