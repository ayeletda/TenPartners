import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dbproject',
  templateUrl: './dbproject.component.html',
  styleUrls: ['./dbproject.component.css']
})
export class DBprojectComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Output() sendComment: EventEmitter<any> = new EventEmitter(); 
  public Name: String;
  public Description: String;
  public Purpose: String;
  public community: string;
  @Input() item;
  @Input() path;
  @Input() first;

  project: FirebaseListObservable<any>;
  communities: FirebaseListObservable<any>;
  public communitysPath: string;
  public view: boolean;
  public more: boolean;
  public newComment: string;
  public comments: FirebaseListObservable<any>;
  public myKey: string;

  constructor(private router: Router, private af: AngularFireDatabase, private serviceService: ServiceService) {
    this.community = "";
    this.communitysPath = this.path + "/associatedCommunities/";
    this.communities = this.af.list("/communities");
    this.newComment = "";
  }

  ngOnInit() {
    this.comments = this.af.list(this.path + "/comments", {
      query: {
        orderByChild: 'nombre'
      }
    });
    this.myKey = this.serviceService.getKey();
    console.log("hhhhhh");
    this.view = this.first;
    this.more = this.first;

  }

  addComment() {
    if (this.newComment != "") {
      this.comments = this.af.list(this.path + "/comments/");
      let key = this.serviceService.getKey();
      let name = this.serviceService.getCurrentUser();
      let date = new Date().toLocaleString();
      let community = this.serviceService.getCommunity();
      this.comments.push({ authorKey: key + "", comment: this.newComment + "", authorName: name + "", date: date + "", community: community + "" }).then(()=> this.scrollToBottom() );
      this.sendComment.emit(this.item.$key);
      this.newComment = "";
    }

  }

  viewComments() {
    console.log()
    this.view = !this.view;
    console.log(this.view);

  }

  viewMore() 
  { this.more = !this.more; 
    if(this.view==true)
        this.view=false;
       }

  checkIfExist() {
    this.project = this.af.list(this.path + "/associatedCommunities/", { preserveSnapshot: true });
    var status = false;
    this.project
      .subscribe(snapshots => {
        snapshots.some(snapshot => {
          var temp = snapshot.key;

          if (this.serviceService.getCommunity() == temp || this.community == temp) {
            status = true;
            return status;
          }
        });
      });



    return status;
  }

  Nominate() {
    if (this.checkIfExist() == false) {

      let cost = prompt("Please enter the project cost", "100$");
      let date = prompt("Please enter the project date", "dd/mm/yyyy");


      this.project = this.af.list(this.path + "/associatedCommunities/");
      this.project.update(this.serviceService.getCommunity() + "", { against: 0, associatedUser: this.serviceService.getKey() + "", avoid: 9, cost: cost, date: date, for: 1, uploudDate: new Date().getTime() + "" });
      alert("The project is nominated");
    }

    else alert("This project already exists in your community");
  }


  pushToBoard() {
    if (this.community != "") {
      if (this.checkIfExist() == false) {
        this.project = this.af.list(this.path + "/associatedCommunities/");
        this.project.update(this.community, { against: 0, associatedUser: "", avoid: 10, cost: "NULL", date: "NULL", for: 0, uploudDate: "NULL" });
        alert("project pushed")
        this.community = "";
      }

      else alert("This project already exists in this community");
    }

    else alert("Enter a community name")
  }






  removeComment(commentkey: string) {
    let meessage = "Are you sure you want to delete the comment?";
    if (confirm(meessage)) {
      const itemObservable = this.af.object(this.path + "/comments/" + commentkey);
      itemObservable.remove();
      this.sendComment.emit(this.item.$key);
    }

  }


 scrollToBottom(): void 
  {
    // if(this.firstTimeOfScoller == true)
    // {
      try 
      {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } 
      catch(err) {}
      // this.firstTimeOfScoller = false;
    //  }
        console.log("in scrollToBottom");

  }


}