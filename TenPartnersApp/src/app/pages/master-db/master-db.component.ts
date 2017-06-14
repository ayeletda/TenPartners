import {ServiceService} from '../../service.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";




@Component({
  selector: 'app-master-db',
  templateUrl: './master-db.component.html',
  styleUrls: ['./master-db.component.css']
})
export class MasterDBComponent implements OnInit {

public projects: FirebaseListObservable<any>;
public newProject: string;
private projectPath: any;
private  projectsValues_Arr: any;
private first:boolean;


constructor(private serviceService:ServiceService, private router: Router, public af: AngularFireDatabase)
   {
  this.projects = this.af.list('projects'); //= select * from projects 

 this.projects.subscribe((snapshots)=>
    {
      this.projectsValues_Arr = [];
      
      snapshots.forEach(snapshot => 
      {
        this.projectsValues_Arr.push(snapshot);
      });
    })

    this.first=true;

   }


   change()
   {
     if(this.first)
           this.first=false;
   }

  ngOnInit() {this.serviceService.setTitle("Master DB");}


 saveProjectPath(project)
  {
    this.projectPath = 'projects/' + project.$key;
    return this.projectPath;
  }



}

