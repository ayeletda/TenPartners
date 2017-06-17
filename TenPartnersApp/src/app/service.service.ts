import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";

@Injectable()

//=============================================  ServiceService class  ============================================================
export class ServiceService 
{
  //user details
  private userName: string;
  private userEmail: string;
  private userID: string;
  private permission: string;
  private community: string;
  private connectType: string;

  private title;
  public allSubscribe: any;
  private usersValues_Arr: any;

  //flags
  private isLoggedIn: boolean;

  //pointers of object or list in firebase
  private usersFBList: FirebaseListObservable<any>;


  constructor(private router: Router, public anguarfireAuth:AngularFireAuth, public af: AngularFireDatabase)
  {
    this.allSubscribe = [];
    this.logout(); 
    this.userName = '';
    this.userEmail = '';
    this.userID = '';
    this.isLoggedIn = false;
    this.usersFBList = this.af.list('/users',{ preserveSnapshot: true });
  }

  public registerUsers(email,password)
  {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) 
    {
      // Handle Errors here.
      let errorMessage = error.message;
    });
  }

  getDetails(user)
  {
    let temp1 = this.usersFBList.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp = snapshot.val();      
        if(this.userEmail == snapshot.val().email)
        {
          user.permission = temp.permission;
          user.community = temp.associatedCommunity;
          user.name = temp.name;
          user.email = temp.email;
          user.id = snapshot.key;
        }
      });
    });
    
    this.allSubscribe.push(temp1);
  }

  checkIfUser()
  {
    let status = false;
    let temp1 = this.usersFBList.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp=snapshot.val();      
        if(this.userEmail==snapshot.val().email)
        {
          this.permission = temp.permission;
          this.community = temp.associatedCommunity;
          this.userName = temp.name;
          this.userID = snapshot.key;
          status = true;
          return status;
        }
      });
    });
  
    this.allSubscribe.push(temp1);
    return status;
  }

  login(username:HTMLInputElement, password:HTMLInputElement)
  {
    this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).then((user)=>
    {
      this.userName = username.value;
      this.userEmail = user.email;
      this.userID = user.uid;
      this.connectType="mail";

      let temp = this.usersFBList.subscribe((snapshots)=>
      {
        this.usersValues_Arr=[];
        snapshots.forEach(snapshot => 
        {
         //////////// mybe in oninit
          this.usersValues_Arr.push(snapshot);
        }
        );
      });
      
      this.allSubscribe.push(temp);
      let status;
      let temp1 = this.usersFBList.subscribe(snapshots => 
      {
        snapshots.some(snapshot => 
        {
          let temp=snapshot.val();      
          if( this.userEmail == snapshot.val().email)
          {
            this.permission = temp.permission;
            this.community = temp.associatedCommunity;
            this.userName = temp.name;
            this.userID = snapshot.key;
            this.isLoggedIn = true;
          }
        });
      });
    })
    .catch((error)=>
    {
      alert("Email or password incorrect");
    });

    password.value = null;
    username.value = null;
  }

  logout()
  {
    this.allSubscribe.forEach((item) => item.unsubscribe);
    this.anguarfireAuth.auth.signOut();
    this.isLoggedIn = false;
    this.title = "home";
  }

  FBlogin()
  {
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then((user)=>
    {
      this.userName = user.user.displayName;
      this.userEmail = user.user.email;
      this.userID = user.user.uid;
      this.connectType = "facebook";

      if (this.checkIfUser() == true)
        this.isLoggedIn = true;  
    })
    .catch((error)=>
    {
      alert("Email or password incorrect");
    });
  }


  GOGlogin()
  {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((user)=>
    {
      this.connectType = "google";
      this.userName = user.user.displayName;
      this.userEmail = user.user.email;
      this.userID = user.user.uid;

      if (this.checkIfUser() == true)
        this.isLoggedIn = true;
    })
    .catch((error)=>
    {
        alert("Email or password incorrect");
    });
  }

  TWITlogin()
  {
    this.connectType = "twitter";

  /*
  var provider = new firebase.auth.TwitterAuthProvider();

  firebase.auth().signInWithPopup(provider).then((user)=>
  {
    alert("Wellcom tenPartner");
    this.isLoggedIn=true;
    this.userName = user.user.displayName;
    this.userEmail = user.user.email;
    this.userID = user.user.uid;
    console.log(this.userID);
    this.router.navigateByUrl('/home');
    this.pushUser();

      //location.reload();      I dont think we need that - check :)
    
  })
  .catch((error)=>
  {
      alert("Email or password incorrect");
  });
  */
}



//getters & setters
  public getKey(){ return this.userID; }
  public getPermission(){ return this.permission; } 
  setTitle(Title:String){ this.title=Title; }  
  public getCommunity(){ return this.community; }
  getCurrentUser(){ return this.userName; }
  getCurrentEmail(){ return this.userEmail; }
  getCurrentID(){ return this.userID; }
  getlogin(){ return this.isLoggedIn; }

}