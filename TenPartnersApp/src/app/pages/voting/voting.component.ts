
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})

export class VotingComponent implements OnInit, AfterViewChecked
{
  savedDate: string = '';
  public newMessage: string;
  public m ;
  public messages: FirebaseListObservable<any>;
  name: string; //////////////////////////////////////////////////////////////////////////////////////////////////
  email: string;
  user: FirebaseListObservable<any>;
  projects: FirebaseListObservable<any>;
  associatedCommunities: FirebaseListObservable<any>;
  userId: string;
  userCommunity: string;
  currentProject: any = '';
  currentProjectValues: any = '';
  projectPath: any = '';
  cost: number;
  date: Date;
  projectSelected:boolean;

  constructor(private service: ServiceService, private router: Router, public af: AngularFireDatabase) 
  {
   
    this.name = this.service.getCurrentUser();
    this.email = this.service.getCurrentEmail();

    this.userId = this.service.getCurrentID();
    this.user = this.af.list('users/' + this.userId); // the specific user
   
    this.user.subscribe((snapshots)=>{
      snapshots.forEach(snapshot => {
        if (snapshot.$key == 'associatedCommunity')
          this.userCommunity = snapshot.$value;

      });
    })
        this.projects = this.af.list('projects');

    this.projects.subscribe((snapshots)=>{
      snapshots.forEach(snapshot => {
        // array.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
        // array2.push(snapshot);
        this.associatedCommunities = this.af.list('projects/' + snapshot.$key + '/associatedCommunities');
        this.currentProjectValues = snapshot;

      });
    })
    this.newMessage = '';
    this.projectSelected = false;

  }

  ngOnInit() {this.service.setTitle("Voting In Progress");}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

saveProjectPath(project)
{
 this.projectPath = 'projects/' + this.currentProjectValues.$key + '/associatedCommunities/' + project.$key;
 return true;
}

loadProjectDetails(project)
{
  this.currentProject = project;
 
  this.messages = this.af.list('projects/' + this.currentProjectValues.$key + '/associatedCommunities/' + project.$key + '/messages'); 
  this.projectSelected = true;
  this.cost=project.cost;
  this.date=project.date;

}
  // ==================================================

  isMe(email)
  {
    if (email == this.email)
      return true;
    return false;
  }
  
  /*
  isMe(email) 
  {
    if (email == this.afService.email)
      return true;
    
    return false;
  }
*/

  // ==================================================
  // If need to print the date ahead

  needToPrint(date)
  {
    if (this.savedDate != date)
    {
      this.savedDate = date;
      //this.ref.detectChanges();

      return true;
    }
    //this.ref.detectChanges();
     return false;
  }


// ==================================================

  sendMessage()
  {
    if(!this.projectSelected)
      alert("You need to choose a project before leaving a message.")
    else if(this.newMessage!='' )
      this.messages.push({message: this.newMessage, name: this.name, email: this.email, date: new Date().toLocaleString()});
    this.newMessage = '';
  }


  ngAfterViewChecked() 
  {
    // this.scrollToBottom();
  }

  scrollToBottom(): void 
  {
    try 
    {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } 
    catch(err) { }
  }

}


