import {ServiceService} from '../../service.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import 'rxjs/Rx';

@Component(
{
  selector: 'app-master-db',
  templateUrl: './master-db.component.html',
  styleUrls: ['./master-db.component.css']
})
 
//=========================  MasterDB class  ============================================================

export class MasterDBComponent implements OnInit 
{
  public newProject: string;
  private projectPath: any;
  private projectsValues_Arr: any;
  private projectName: string;
  private search: string;
  private currentProjecOpentKey: string;

  //pointers of object or list in firebase
  public projectsFBList: any;

  //flags
  private first: boolean;

  //==========================  constructor  ============================================================
  
  constructor(private router: Router, private servise: ServiceService, public af: AngularFireDatabase)
  {
    this.search = '';
    this.projectName = '';
    this.projectsFBList = this.af.list('projects').take(1); //= select * from projects 
    
    let temp = this.projectsFBList.subscribe((snapshots)=>
    {
      this.projectsValues_Arr = [];
        
      snapshots.forEach(snapshot => 
      {
        this.projectsValues_Arr.push(snapshot);
      });
    })
  
    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
    this.servise.allSubscribe.push(temp);

    this.first = false;
  }

  //==========================  ngOnInit  ============================================================

  ngOnInit() 
  {
    this.servise.setTitle("Master DB");
  }
  
  //======================  saveProjectPath  ============================================================

  saveProjectPath(project)
  {
    this.projectPath = 'projects/' + project.$key;
    return this.projectPath;
  }

  //========================  searchProject  ============================================================

  searchProject()
  {
    this.search = this.projectName;
    this.first = false;
  }

  //  change()
  //  {
  //    if(this.first)
  //          this.first=false;
  //  }

  //==========================  commentOpen  ============================================================

  commentOpen(key:string)
  {
    //adva delete this. not all if have a problem
    //toceckifheveproblem 
    //this.currentProjecOpentKey=key;
  }

  //==========================  firstC  ============================================================

  firstC(key:string)
  {
    if(key == this.currentProjecOpentKey)
      return true;
    return false;
  }

}


