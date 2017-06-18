import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output } from "@angular/core";
import { ServiceService } from '../service.service';

@Component(
  {
    selector: 'app-dbproject',
    templateUrl: './dbproject.component.html',
    styleUrls: ['./dbproject.component.css']
  })

//=============================  DBprojectComponent class  ===========================================================================================

export class DBprojectComponent implements OnInit 
{
  @ViewChild('scrollMe')    myScrollContainer: ElementRef;

  @Output() sendComment: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() item;
  @Input() path;
  @Input() first;

  //user details
  user = { id: null, permission: null, community: null, name: null, email: null };

  description: String;
  purpose: String;
  community: string;
  communitysPath: string;
  newComment: string;

  //pointers of object or list in firebase
  commentsFBList: FirebaseListObservable<any>;
  likesFBList: FirebaseListObservable<any>;
  usersVotingFBList: FirebaseListObservable<any>;
  projectFBList: FirebaseListObservable<any>;
  communitiesFBList: FirebaseListObservable<any>;

  //flags
  view: boolean;
  more: boolean;
  islike: boolean;
  whatToView:string;
  //====================================  constructor  ===========================================================================================

  constructor( private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {
    //initializes
    this.community = "";
    this.newComment = "";
    this.communitysPath = this.path + "/associatedCommunities/";
    this.communitiesFBList = this.af.list("/communities");

    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.getDetails(this.user);
    this.whatToView="";
  }

  //=======================================  ngOnInit  ===========================================================================================

  ngOnInit() 
  {
    this.commentsFBList = this.af.list(this.path + "/comments",
      {
        query:
        {
          orderByChild: 'nombre'
        }
      });

    this.likesFBList = this.af.list(this.path + "/likes/",
      {
        query:
        {
          orderByChild: 'nombre'
        },
         preserveSnapshot: true

      });

    this.view = this.first;
    this.more = this.first;
    this.islike=this.checkIfdoLike();
  }

  //=======================================  addComment  ================================================================================================

  addComment() 
  {
    if (this.newComment != "") 
    {
      this.commentsFBList = this.af.list(this.path + "/comments/");
      let date = new Date().toLocaleString();
      let community = this.user.community;
      this.commentsFBList.push({ authorKey: this.user.id + "", comment: this.newComment + "", authorName: this.user.name + "", date: date + "", community: community + "" }).then(() => this.scrollToBottom());
      this.sendComment.emit(this.item.$key);
      this.newComment = "";
    }
  }

  //====================================  checkIfdoLike  ===================================================================================================

  checkIfdoLike()
  {
    this.likesFBList = this.af.list(this.path + "/likes/", { preserveSnapshot: true });
    let status = false;
  
    let temp = this.likesFBList.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp1 = snapshot.key;
        if (this.user.id == temp1) 
        {
          status = true;
        }
      });
    });

    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.allSubscribe.push(temp);
    return status;
  }

  //====================================  doLike  ===================================================================================================

  doLike() 
  {
    this.islike =! this.islike;
    if(this.checkIfdoLike() == false)
      this.likesFBList.update(this.user.id+"",{userName: this.user.name, userCommunity: this.user.community});
    else
    {
      const itemObservable = this.af.object(this.path + "/likes/" + this.user.id);
      itemObservable.remove();
    }       
  }

  //====================================  viewComments  ===================================================================================================

  viewComments(view:string) 
  {
    if(this.whatToView==view)
          this.view = !this.view;

    else{ this.whatToView=view;

      if(this.view==false)
          this.view=true;
    }

    this.close.emit();
  }

  //======================================  viewMore  ===============================================================================================

  viewMore() 
  {
    this.more = !this.more;
    if (this.view == true) 
      this.view = false;

    this.close.emit();
  }

  //=======================================  checkIfExist  =============================================================================================

  checkIfExist() 
  {
    this.projectFBList = this.af.list(this.path + "/associatedCommunities/", { preserveSnapshot: true });
    
    let status = false;
    let temp = this.projectFBList.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp1 = snapshot.key;

        if (this.user.community == temp1 || this.community == temp1) 
          status = true;
      });
    });

    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.allSubscribe.push(temp);
    return status;
  }

  //==========================================  Nominate  =======================================================================================

  Nominate() 
  {
    if (this.checkIfExist() == false) 
    {
      let cost = prompt("Please enter the project cost", "100$");
      let date = prompt("Please enter the project date", "dd/mm/yyyy");

      this.projectFBList = this.af.list(this.path + "/associatedCommunities/");
      this.projectFBList.update(this.user.community + "", { against: 0, associatedUser: this.user.id + "", avoid: 9, cost: cost, date: date, for: 1, uploudDate: new Date().getTime() + "" });

      this.usersVotingFBList = this.af.list(this.path + "/associatedCommunities/" + this.user.community + "/votingList");
      this.usersVotingFBList.update(this.user.id + "", { vote: "for" });

      alert("The project is nominated");
    }

    else alert("This project already exists in your community");
  }

  //=========================================  pushToBoard  ==================================================================================================

  pushToBoard() 
  {
    if (this.community != "") 
    {
      if (this.checkIfExist() == false) 
      {
        this.projectFBList = this.af.list(this.path + "/associatedCommunities/");
        this.projectFBList.update(this.community, { against: 0, associatedUser: "", avoid: 10, cost: "NULL", date: "NULL", for: 0, uploudDate: "NULL" });
        alert("project pushed")
        this.community = "";
      }

      else alert("This project already exists in this community");
    }

    else alert("Enter a community name")
  }

  //=======================================  removeComment  ==========================================

  removeComment(commentkey: string) 
  {
    let meessage = "Are you sure you want to delete the comment?";

    if (confirm(meessage)) 
    {
      const itemObservable = this.af.object(this.path + "/comments/" + commentkey);
      itemObservable.remove();
      this.sendComment.emit(this.item.$key);
    }
  }

  //=======================================  scrollToBottom  ==========================================

  scrollToBottom() 
  {
    try 
    {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch (err) { }
  }

}