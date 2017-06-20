import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output, OnDestroy } from "@angular/core";
import { ServiceService } from '../service.service';

@Component(
  {
    selector: 'app-dbproject',
    templateUrl: './dbproject.component.html',
    styleUrls: ['./dbproject.component.css']
  })

//=============================  DBprojectComponent class  ===========================================================================================

export class DBprojectComponent implements OnInit, OnDestroy 
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
  cost: string;
  date: Date;

  //pointers of object or list in firebase
  commentsFBList: FirebaseListObservable<any>;
  likesFBList: FirebaseListObservable<any>;
  usersVotingFBList: FirebaseListObservable<any>;
  projectFBList: FirebaseListObservable<any>;
  communitiesFBList: FirebaseListObservable<any>;
  projectsFBList: FirebaseListObservable<any>;
  communitiesValues_Arr: any;

  //flags
  view: boolean;
  more: boolean;
  islike: boolean;
  isExists: boolean;
  doesNeedPop: boolean;
  whatToView: string;
  whatToPop: string;
  
  //====================================  constructor  ===========================================================================================

  constructor( private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {

 //initialize projectsValues_Arr
 //not do nothing not working witout this 
    // this.projectsFBList = this.af.list('projects');

    // let temp = this.projectsFBList.subscribe((snapshots)=>
    // {
    //   this.projectsValues_Arr=[];
    //   snapshots.forEach(snapshot => 
    //   {
    //     this.projectsValues_Arr.push(snapshot);
    //   });
    // });

    //pushes subscribe to an array for freeing it (listener to firebase) when login-out
    // this.service.allSubscribe.push(temp);
    //untill here!!!!!

    //initializes
    this.community = "";
    this.newComment = "";
    this.communitysPath = this.path + "/associatedCommunities/";
    this.communitiesFBList = this.af.list("/communities");
    this.doesNeedPop = false;
    this.cost="";


    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.getDetails(this.user);
    this.whatToView="";
    this.whatToPop="";
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
    this.checkIfdoLike();


    
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

  // get _status(){

  // }

  // set _status(flag: boolean){

  // }
  checkIfdoLike()
  {
    this.likesFBList = this.af.list(this.path + "/likes/", { preserveSnapshot: true});
    this.islike = false;
  
    let temp = this.likesFBList.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp1 = snapshot.key;
        if (this.user.id == temp1) 
        {
           this.islike =true;
        }
      });
    });
    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.allSubscribe.push(temp);
  }

  //====================================  doLike  ===================================================================================================

  doLike() 
  {
    this.islike =! this.islike;
    if(this.islike == true)
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
    
    this.isExists=false;

    let temp = this.projectFBList.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp1 = snapshot.key;
        console.log("temp1:"+temp1+"community:"+this.community);
        if (this.user.community == temp1 || this.community == temp1) 
                     {console.log("here true in is exist");
                       this.isExists = true;
                     }
      });
    });

    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.allSubscribe.push(temp);
    }



PopMassage()
{
  this.checkIfExist();

  if(this.doesNeedPop==false)
  { 
      if(this.isExists==true)
        { this.whatToPop="existsPop";
          this.doesNeedPop=true;
          
        return;}

  }
  this.whatToPop ="detailsPop";
  this.doesNeedPop =!this.doesNeedPop;
}

  //==========================================  Nominate  =======================================================================================

  Nominate() 
  {
      this.doesNeedPop = false;
      this.checkIfExist();
 
    if ( this.isExists== false) 
    {
      let cost =this.cost;
      let date = this.date;

      if(cost==""||this.date==null)
          { this.whatToPop="emptyPop";
           this.doesNeedPop = true;
            return;}

      this.projectFBList = this.af.list(this.path + "/associatedCommunities/");
      this.projectFBList.update(this.user.community + "", { against: 0, associatedUser: this.user.id + "", avoid: 9, cost: cost, date: date, for: 1, uploudDate: new Date().getTime() + "" });

      this.usersVotingFBList = this.af.list(this.path + "/associatedCommunities/" + this.user.community + "/votingList");
      this.usersVotingFBList.update(this.user.id + "", { vote: "for" });
      this.cost="";
      this.date=null;
      this.whatToPop="nominatePop";
      this.doesNeedPop=true;
    }

  }

  //=========================================  pushToBoard  ==================================================================================================


//function after if
  pushToBoard(communityPush:string) 
  { this.community=communityPush;
    console.log(this.community);

    this.checkIfExist();

    if (this.community != "") 
    {
      if (this.isExists == false) 
      {
        console.log("here is exsits push board");
        this.projectFBList = this.af.list(this.path + "/associatedCommunities/");
        this.projectFBList.update(this.community, { against: 0, associatedUser: "", avoid: 10, cost: "NULL", date: "NULL", for: 0, uploudDate: "NULL" });
        this.whatToPop="pushedPop";
        this.doesNeedPop=true;
        this.community = "";
      }

      else{this.whatToPop="existsPop";
          this.doesNeedPop=true;
          this.community = ""; }
    }

    else{this.whatToPop="communityEmptyPop";
          this.doesNeedPop=true;}
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

  public ngOnDestroy(){
    // this.likesFBList.un
  }

}