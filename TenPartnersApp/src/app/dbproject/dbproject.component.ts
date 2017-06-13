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
  communities: FirebaseListObservable<any>;
  public communitysPath:string;


  constructor(private router: Router, private af: AngularFireDatabase,private serviceService:ServiceService) 
  {
    this.community="";
    this.communitysPath=this.path+"/associatedCommunities/";
    this.communities=this.af.list("/communities");
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
                console.log(this.serviceService.getCommunity());  
       if(this.serviceService.getCommunity()==temp||this.community==temp)
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

let cost = prompt("Please enter the project cost", "100$");
let date =prompt("Please enter the project date", "dd/mm/yyyy");


      this.project = this.af.list(this.path+"/associatedCommunities/");
      this.project.update(this.serviceService.getCommunity()+"",{against:0,associatedUser:this.serviceService.getKey()+"",avoid: 10,cost: cost,date: date,for:0,uploudDate:"NULL"});
       alert("The project is nominated");}

       else  alert("This project already exists in your community");
}


pushToBoard(){
console.log(this.community);
      if(this.community!=""){
        if(this.checkIfExist()==false){  
      this.project = this.af.list(this.path+"/associatedCommunities/");
      this.project.update(this.community,{against:0,associatedUser:"",avoid:10 ,cost:"NULL",date: "NULL",for:0,uploudDate:"NULL"});
      alert("project pushed")
      this.community="";
       } 
      
      else  alert("This project already exists in this community");
    }

      else alert("Enter a community name")
}



openComments(){console.log("comments");}

}
