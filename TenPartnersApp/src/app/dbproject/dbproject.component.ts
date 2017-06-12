import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-dbproject',
  templateUrl: './dbproject.component.html',
  styleUrls: ['./dbproject.component.css']
})
export class DBprojectComponent implements OnInit {
  public Name:String;
  public Description:String;
  public Purpose:String;
  public community:string;
  @Input()item;
  @Input()path;
  project: FirebaseListObservable<any>;
  public communitysPath:string;


  constructor(private router: Router, private af: AngularFireDatabase,private serviceService:ServiceService) 
  {
    this.community="";
    this.communitysPath=this.path+"/associatedCommunities/";
  }

  ngOnInit() {}


  checkIfExist(){
               this.project = this.af.list(this.path+"/associatedCommunities/",{ preserveSnapshot: true });
               var status=false;
              this.project
                .subscribe(snapshots => {
                  snapshots.some(snapshot => {
                  var temp=snapshot.key;      
                console.log(temp);    
       if(this.serviceService.getCommunity()==temp)
          {
            status=true;
            return status;
         }
    });
  });



          return status;
  }

  Nominate()
  {
  //  var ref = firebase.database().ref(this.path);
  //   ref.once("value").then(function(snapshot) {
  //  if(snapshot.hasChildren()==false||snapshot.child("3").hasChildren())
  //   console.log(snapshot.child("3").hasChildren());
  // });
      if(this.checkIfExist()==false){
      this.project = this.af.list(this.path+"/associatedCommunities/");
      this.project.update(this.serviceService.getCommunity(),{against:0,associatedUser:this.serviceService.getKey(),avoid: 10,cost:"NULL",date: "NULL",for:0,uploudDate:"NULL"});
       alert("project nominated");}
}


pushToBoard(){

      if(this.community!=""){
        if(this.checkIfExist()==false){  
      this.project = this.af.list(this.path+"/associatedCommunities/");
      this.project.update(this.community,{against:0,associatedUser:"",avoid:10 ,cost:"NULL",date: "NULL",for:0,uploudDate:"NULL"});
      alert("project pushed")
      this.community="";
       } }

      else alert("community name is empty!")
}



openComments(){console.log("comments");}

}
