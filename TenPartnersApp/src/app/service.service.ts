import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";

@Injectable()

//================  ServiceService class  ============================================================

export class ServiceService 
{  
  //user details
  user = { id: null, permission: null, community: null, name: null, email: null };
  connectType: string;

  title;
  allSubscribe: any;
  usersValues_Arr: any;

  //flags
  isLoggedIn: boolean;

  //pointers of object or list in firebase
  usersFBList: FirebaseListObservable<any>;

  //==================== constructor ===============================================================
  
  constructor( private router: Router, public anguarfireAuth:AngularFireAuth, public af: AngularFireDatabase)
  {
    this.allSubscribe = [];

    this.isLoggedIn = false;
    this.usersFBList = this.af.list('/users',{ preserveSnapshot: true });
    this.logout(); 

  }

  //=================== registerUsers ===============================================================

  public registerUsers(email,password)
  {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) 
    {
      // Handle Errors here.
      let errorMessage = error.message;
    });
  }
  
  //==================== getDetails ===============================================================

  getDetails(user)
  {
    let temp1 = this.usersFBList.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp = snapshot.val();      
        if(this.user.email == snapshot.val().email)
        {
          user.permission = temp.permission;
          user.community = temp.associatedCommunity;
          user.name = temp.name;
          user.email = temp.email;
          user.id = snapshot.key;
          // user.google = temp.google;
          // user.facebook=temp.facebook;
          // user.twitter=temp.twitter;
        }
      });
    });
    
    this.allSubscribe.push(temp1);
  }

  //===================== getDetails ===============================================================

  checkIfUser()
  {
    let status = false;
    let users =  this.af.list('/users',{ preserveSnapshot: true }).take(1);

    let temp1 = users.subscribe(snapshots => 
    {
      snapshots.some(snapshot => 
      {
        let temp=snapshot.val();      
        if(this.user.email==snapshot.val().email)
        {
          status = true;
        }
      });
    });

     this.allSubscribe.push(temp1);

    return status;
  }

//==================  types of connection  ============================================================

  //----------------------- logout -----------------------------
  logout()
  {
    //this.allSubscribe.forEach((item) => item.unsubscribe);
    console.log("subscribe: "+this.allSubscribe.length);
    this.anguarfireAuth.auth.signOut();
    this.isLoggedIn = false;
    this.title = "home";
  }

  //----------------- email & fassword login ------------------------
  login(username:HTMLInputElement, password:HTMLInputElement)
  {
    this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).then((user)=>
    {
      this.connectType="mail";
      this.user.name = username.value;
      this.user.email = user.email;
      this.user.id = user.uid;

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
      this.getDetails(this.user);
    })
    .catch((error)=>
    {
      alert("Email or password incorrect");
    });

    password.value = null;
    username.value = null;
  }

  //-------------------- facebook login ------------------------
  FBlogin()
  {
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then((user)=>
    {
      this.connectType = "facebook";

      // a method that initializes user's details
      this.initializeUserDetails(user, this.connectType);
    })
    .catch((error)=>
    {
      alert("Email or password incorrect");
    });
  }

  //--------------------- google login --------------------------
  GOGlogin()
  {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((user)=>
    {
      this.connectType = "google";

      // a method that initializes user's details
      this.initializeUserDetails(user, this.connectType);
    })
    .catch((error)=>
    {
    });
  }

  //--------------------- twitter login ------------------------
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

  // a method that initializes user's details
   initializeUserDetails(user, connectType)
  {
    this.user.name = user.user.displayName;
    this.user.email = user.user.email;
    this.user.id = user.user.uid;

    if(connectType == "facebook" || connectType == "google" || connectType == "twitter")
      if (this.checkIfUser() == true)
        this.isLoggedIn = true;  
  }

//getters & setters
  // public getKey(){ return this.user.id; }
  // public getPermission(){ return this.user.id } 
  // public getCommunity(){ this.user.community; }
  // getCurrentUser(){ return this.user.name; }
  // getCurrentEmail(){ return this.user.email; }
  // getCurrentID(){ return this.user.id; }
    setTitle(Title:String){ this.title=Title; }  
  getlogin(){ return this.isLoggedIn; }

}