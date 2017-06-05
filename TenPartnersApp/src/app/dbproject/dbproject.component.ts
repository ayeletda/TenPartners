import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";

@Component({
  selector: 'app-dbproject',
  templateUrl: './dbproject.component.html',
  styleUrls: ['./dbproject.component.css']
})
export class DBprojectComponent implements OnInit {
  public Name:String;
  public Description:String;
  public Purpose:String;
  private projects: FirebaseListObservable<any>;
  private pointerToProjectInAF: any;
  pointerToProjectObjectInAF: any;
  @Input() item;


  constructor(private router: Router, private af: AngularFireDatabase) { 
        this.projects = this.af.list('projects');

  }

  ngOnInit() {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF = this.af.object(this.item, { preserveSnapshot: true });
    this.Name = this.pointerToProjectInAF.$ref.path.o[1];

  }

}
