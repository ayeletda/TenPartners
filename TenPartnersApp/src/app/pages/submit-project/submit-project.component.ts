import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';



@Component({
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.css']
})
export class SubmitProjectComponent implements OnInit {

  public Name:String;
  public Description:String;
  public Purpose:String;
  projects: FirebaseListObservable<any>;
  projectsValues_Arr: any;
  public messages: FirebaseListObservable<any>;


  constructor(private service: ServiceService, private router: Router, public af: AngularFireDatabase) 
  {
    this.Name="";
    this.Description="";
    this.Purpose="";

     this.projects = this.af.list('projects');

    this.projects.subscribe((snapshots)=>{
              this.projectsValues_Arr=[];
      snapshots.forEach(snapshot => {
   //////////// mybe in oninit
        this.projectsValues_Arr.push(snapshot);});})

  }

  ngOnInit() {this.service.setTitle("Submit Project");}

  sendProject()
  {
    console.log("hrhr "+ this.Name + this.Description+this.Purpose);

    if(this.Name==""||this.Description==""||this.Purpose=="")
        alert("something's missing");

    else {
      this.projects.push({Name: this.Name, Description: this.Description,Purpose: this.Purpose});
      this.Name = '';
      this.Description="";
      this.Purpose="";
       alert("your project send!");
      }
  }

}
