import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
  {
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.css']
  })

//=============================================  VotingComponent class  ============================================================

export class VotingComponent implements OnInit 
{
  @ViewChild('scrollMe')  myScrollContainer: ElementRef;

  //user details
  user;

  //project details
  currentProject: any;
  projectPath: any;
  cost: number;
  date: Date;
  purpose: string;
  description: string;

  //message details
  savedDate: string;
  newMessage: string;
  messagesFBList: FirebaseListObservable<any>;

  //pointers of object or list in firebase
  projectsFBList: FirebaseListObservable<any>;
  projectsAssociatedCommunities_Arr: any;
  projectValues_Arr: any;

  //flags
  isProjectSelected: boolean;
  isNeedViewMore: boolean;
  isNoProjects:boolean;

  //======================================================  constructor  ============================================================

  constructor( private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {
    //initializes with defult values
    this.isNoProjects = true;
    this.currentProject = '';
    this.projectPath = '';
    this.cost = -1;
    this.date = null;
    this.purpose = '';
    this.description = '';
    this.savedDate = '';
    this.newMessage = '';
    this.messagesFBList = null;
    this.isProjectSelected = false;
    this.isNeedViewMore = false;

    //function (in servic.component.ts) that returns a pointer to user object that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.user = this.service.getUser();

    //updates the projects in part1 (projects for voting)
    this.projectsFBList = this.af.list('projects');

    let temp2 = this.projectsFBList.subscribe((snapshots) => 
    {
      this.projectsAssociatedCommunities_Arr = [];
      this.projectValues_Arr = [];

      snapshots.forEach(snapshot => 
      {
        this.projectsAssociatedCommunities_Arr.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
        this.projectValues_Arr.push(snapshot);
      });
    });

    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
    this.service.allSubscribe.push(temp2);
  }

  //========================================================  ngOnInit  ============================================================

  ngOnInit() 
  {
    // scrolls the scrollBar of the chat to the bottom
    this.scrollToBottom()

    // sets page title
    this.service.setTitle("Voting In Progress");
  }

  //========================================================  saveProjectPath  =========================================================

  saveProjectPath(project, i) 
  {
    this.projectPath = 'projects/' + this.projectValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
    this.isNoProjects = false;
    return true;
  }

  //======================================================  loadProjectDetails  =========================================================

  loadProjectDetails(project, i) 
  {
    this.currentProject = project;
    this.messagesFBList = this.af.list('projects/' + this.projectValues_Arr[i].$key + '/associatedCommunities/' + project.$key + '/messages');
    this.isProjectSelected = true;
    this.cost = project.cost;
    this.date = project.date;
    this.purpose = this.projectValues_Arr[i].purpose;
    this.description = this.projectValues_Arr[i].description;

    this.isNeedViewMore = false;
  }

  //=========================================================  viewMore  ============================================================

  viewMore(bol) 
  {
    this.isNeedViewMore = bol;
  }
  
  //======================================================  isMe(email)  =========================================================
  // helps to change the bubble's color

  isMe(email) 
  {
    if (this.user.email == email)
      return true;
    return false;
  }

  //======================================================  needToPrint  =========================================================
  // If need to print the date ahead

  needToPrint(date) 
  {
    if (this.savedDate != date) 
    {
      this.savedDate = date;
      return true;
    }
    return false;
  }

  //=====================================================  sendMessage  =========================================================

  sendMessage() 
  {
    if (!this.isProjectSelected)
      alert("You need to choose a project before sending a message.")
    else if (this.newMessage != '')
      this.messagesFBList.push({ message: this.newMessage, name: this.user.name, email: this.user.email, date: new Date().getTime() }).then(()=>
      {
        this.scrollToBottom();
      }
      );

    this.newMessage = '';
  }

  //======================================================   scrollToBottom  =========================================================

  scrollToBottom(): void 
  {
    try 
    {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch (err) { }
 }
 
}


