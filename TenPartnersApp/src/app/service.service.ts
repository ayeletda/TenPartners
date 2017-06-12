import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";

@Injectable()

export class ServiceService 
{
  //user details
  private userName : string;
  private userID:any;
  private permission:string;
  private community:string;

  //user account
  private userEmail : string;
  private connectType:string;
 
  private title;

  // pointers to object or list in firebase
  private users: FirebaseListObservable<any>;
  private usersValues_Arr: any;

  //flags
  private isLoggedIn;

  private status: boolean;
//====================================================  constructor  ============================================================

  constructor(private router: Router, public anguarfireAuth:AngularFireAuth,public af: AngularFireDatabase)
  {
    this.logout(); 
    this.userName ='';
    this.userID = '';
    this.userEmail = '';
    this.isLoggedIn=false;

    this.users = this.af.list('/users',{ preserveSnapshot: true });
    this.status = false;
    
    this.checkIfUser();
    this.users.subscribe((snapshots)=>
    {
      this.usersValues_Arr=[];
      snapshots.forEach(snapshot => 
      {
        /////// mybe in oninit
        this.usersValues_Arr.push(snapshot);
      });
    })
  }

//====================================================  registerUsers  ============================================================

  public registerUsers(email,password)
  {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) 
      {
        // Handle Errors here.
        let errorMessage = error.message;
        console.log(error);
      }
    ); 
  }

//====================================================    checkIfUser  ============================================================

  checkIfUser()
  {
    this.status = false;
    this.users.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => 
      {
        console.log(snapshot.val().mail);
        let temp = snapshot.val();      
        
        if(this.userEmail == temp.mail || this.userEmail == temp.google || this.userEmail == temp.facebook)
          {
            console.log("hereee");
            this.permission = temp.permission;
            this.community = temp.associatedCommunity;
            this.userName = temp.name;
            this.status = true;
            stop;
          }
      });
    });

  // return status;
  }

//===============================================  types of connection  ============================================================

  //----------------------- logout -----------------------------

  logout()
  {
    // this.anguarfireAuth.authState.subscribe(() => this.router.navigate(['']));
    // The composed observable completes, so there's no need to unsubscribe.
    this.anguarfireAuth.auth.signOut();
    this.isLoggedIn = false;
    this.title = "home";
  }


  //-------------------- facebook login ------------------------

  login(username:HTMLInputElement, password:HTMLInputElement)
  {
    this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).
    then((user)=>
    {
      this.userName = username.value;
      this.userEmail = user.email;
      this.userID = user.uid;
      this.connectType = "mail";

      if (this.status == true)
        this.isLoggedIn = true;    
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
      // this.isLoggedIn=true;
      this.userName = user.user.displayName;
      this.userEmail = user.user.email;
      this.userID = user.user.uid;
      this.connectType = "facebook";

      if (this.status==true)
        this.isLoggedIn=true;    
    })
    .catch((error)=>
    {
        alert("Email or password incorrect");
    });
  }

  //-------------------- google login ------------------------

  GOGlogin()
  {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((user)=>
    {
        this.connectType = "google";
        this.userName = user.user.displayName;
        this.userEmail = user.user.email;
        this.userID = user.user.uid;

      if (this.status==true)
              this.isLoggedIn=true;

      console.log(this.isLoggedIn);
      //  this.isLoggedIn=true;
    
      console.log(this.userID);
    })
    .catch((error)=>
    {
        alert("Email or password incorrect");
    });
  }

  //-------------------- twitter login ------------------------

  TWITlogin()
  {
    this.connectType = "twitter";

    /*
    let provider = new firebase.auth.TwitterAuthProvider();

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

//===============================================  getters & setters  ============================================================

  setTitle(Title:String) { this.title = Title; }  
  getKey() { return this.userID; }
  getCommunity() { return this.community; }
  getPermission() { return this.permission; } 
  getCurrentUser() { return this.userName; }
  getCurrentEmail() { return this.userEmail; }
  getCurrentID() { return this.userID; }
  getlogin() { return this.isLoggedIn; }

}
