
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input } from "@angular/core";


@Component(
    {
      selector: 'app-projectForSelect',
      templateUrl: './projectForSelect.component.html',
      styleUrls: ['./projectForSelect.component.css']
    })

export class ProjectForSelectComponent implements OnInit
{
  @Input() item;
  private projects: FirebaseListObservable<any>;
  private pointerToProjectInAF: any;
  pointerToProjectObjectInAF:any;
  projectName: string;

  constructor(private router: Router, private af: AngularFireDatabase)
  {
    this.projects=this.af.list('projects');
  }

  ngOnInit() {

    this.pointerToProjectInAF =  this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF =  this.af.object(this.item ,{ preserveSnapshot: true });
    this.projectName=this.pointerToProjectInAF.$ref.path.o[1]
  }
}

















/*
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component(
{
  selector: 'app-projectForSelect',
  templateUrl: './projectForSelect.component.html',
  styleUrls: ['./projectForSelect.component.css']
})

export class ProjectForSelectComponent implements OnInit 
{
  constructor(private router: Router) {}

  ngOnInit() {}
}
    */