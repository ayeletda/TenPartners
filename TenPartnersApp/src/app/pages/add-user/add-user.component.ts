import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private router: Router,private serviceService:ServiceService) {
    
  }

  ngOnInit() {
    this.serviceService.setTitle("Add user");
  }

  sendProject()
  {
/*    console.log("hrhr "+ this.Name + this.Description+this.Purpose);

    if(this.Name==""||this.Description==""||this.Purpose=="")
        alert("something's missing");

    else {
      this.projects.update(this.Name ,{name: this.Name, description: this.Description,purpose: this.Purpose,associatedCommunities: "NULL"});
      this.Name = '';
      this.Description="";
      this.Purpose="";
       alert("your project send!");
      }
*/
  }
}
