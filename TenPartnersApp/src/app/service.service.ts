
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ApplicationRef } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";


interface User { id: string, permission: number, community: number, name: string, email: string };

@Injectable()

//================  ServiceService class  ============================================================

export class ServiceService 
{  
  //user details
  user: User;
  connectType: string;

  allSubscribe: any;
  usersValues_Arr: any;

  //flags
  isLoggedIn: boolean;
  firstTime: boolean;
  //pointers of object or list in firebase
  usersFBList: FirebaseListObservable<any>;

  //==================== constructor ===============================================================
  
  constructor( private router: Router, public anguarfireAuth: AngularFireAuth, public af: AngularFireDatabase) //, private ref: NgZone
  {
    this.firstTime = true;
    this.allSubscribe = [];
    this.user = { id: null, permission: null, community: null, name: null, email: null };
    this.isLoggedIn = false;
    this.usersFBList = this.af.list('/users',{ preserveSnapshot: true });
    this.getDetails();
  }

  //=================== registerUsers ===============================================================

  public registerUsers(email,password)
  {
    this.anguarfireAuth.auth.createUserWithEmailAndPassword(email, password).catch(function(error) 
    {
      // Handle Errors here.
      let errorMessage = error.message;
    });
  }
  
  //==================== getDetails ===============================================================

  getDetails()
  {
    let temp1 = this.usersFBList.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => 
      {
        let temp = snapshot.val();      
        if(this.user.email == temp.email)
        {
          this.user.permission = temp.permission;
          this.user.community = temp.associatedCommunity;
          this.user.name = temp.name;
          this.user.email = temp.email;
          this.user.id = snapshot.key;
          // user.google = temp.google;
          // user.facebook=temp.facebook;
          // user.twitter=temp.twitter;

          if(this.firstTime)
          {
            this.firstTime = false;
          //if it's admin
          if(this.user.permission == 1)
            this.router.navigateByUrl('/home');

          //if it's authorized user
          else if(this.user.permission == 2)
            this.router.navigateByUrl('/voting');

          //if it's blocked user
          else if(this.user.permission == 3)
            this.router.navigate(['']);;
          }
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
    // console.log("subscribe: befor "+this.allSubscribe.length);
    // this.allSubscribe.forEach((item) => item.unsubscribe());
    // console.log("subscribe: after "+this.allSubscribe.length);
    this.anguarfireAuth.auth.signOut();
    this.isLoggedIn = false;
    this.firstTime = true;
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
      this.user = this.getUser();
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

  //=============== getters & setters ==================================================
   
  getlogin(){ return this.isLoggedIn; }
  getUser(){ return this.user; }
  setEmail(email){ this.user.email = email; }

}