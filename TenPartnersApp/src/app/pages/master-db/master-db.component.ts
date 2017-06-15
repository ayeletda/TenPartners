import {ServiceService} from '../../service.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import 'rxjs/Rx';



@Component({
  selector: 'app-master-db',
  templateUrl: './master-db.component.html',
  styleUrls: ['./master-db.component.css']
})
export class MasterDBComponent implements OnInit {

public projects;
public newProject: string;
private projectPath: any;
private  projectsValues_Arr: any;
private first:boolean;
private projectName:string;
private search:string;
private currentProjecOpentKey:string;


constructor(private serviceService:ServiceService, private router: Router, public af: AngularFireDatabase)
   {
  this.projects = this.af.list('projects').take(1); //= select * from projects 
  this.search = '';
  this.projectName="";

 this.projects.subscribe((snapshots)=>
    {
      this.projectsValues_Arr = [];
      
      snapshots.forEach(snapshot => 
      {
        this.projectsValues_Arr.push(snapshot);
      });
    })

    this.first=false;

   }

   searchProject(){
      this.search=this.projectName;
      this.first=false;
   }

  //  change()
  //  {
  //    if(this.first)
  //          this.first=false;
  //  }

  ngOnInit() {this.serviceService.setTitle("Master DB");}


commentOpen(key:string)
{
  console.log("hello");
  this.currentProjecOpentKey=key;
}

firstC(key:string)
{
  if(key == this.currentProjecOpentKey)
      return true;

else false;
}


 saveProjectPath(project)
  {
    this.projectPath = 'projects/' + project.$key;
    return this.projectPath;
  }



}

