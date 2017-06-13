import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";





@Injectable()
export class ServiceService {
  userName:string;
  userEmail:string;
  userID:string;
  permission:string;
  community:string;
 // password:String; I dont think we need that - check :)
  private isLoggedIn;
  private title;
  users: FirebaseListObservable<any>;
  usersValues_Arr: any;
  connectType:string;


  constructor(private router: Router, public anguarfireAuth:AngularFireAuth,public af: AngularFireDatabase)
  {
    this.logout(); 
    this.userName ='';
    this.userEmail = '';
    this.userID='';
  //  this.password=''; I dont think we need that - check :)
    this.isLoggedIn=false;

     this.users = this.af.list('/users',{ preserveSnapshot: true });

    this.users.subscribe((snapshots)=>{
              this.usersValues_Arr=[];
      snapshots.forEach(snapshot => {
   //////////// mybe in oninit
        this.usersValues_Arr.push(snapshot);});})
    
    
  }


 
 public registerUsers(email,password)
{
firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorMessage = error.message;
  console.log(error);
});  }


checkIfUser(){

var status=false;
this.users
  .subscribe(snapshots => {
    snapshots.some(snapshot => {
      console.log(snapshot.val().mail);
      console.log(this.userEmail);
     var temp=snapshot.val();      
       console.log(this.userEmail==snapshot.val().email)
       if(this.userEmail==snapshot.val().email||this.userEmail==snapshot.val().email||this.userEmail==snapshot.val().email)
          {
            console.log("hereee");
            this.permission=temp.permission;
            this.community=temp.associatedCommunity;
            this.userName=temp.name;
            this.userID=snapshot.key;
            console.log(this.userID);
            status =true;
            return status;
          }
        





    });
  });




return status;
}


public getKey(){return this.userID;}


public getPermission(){
  return this.permission;
} 

setTitle(Title:String){this.title=Title;}  

public getCommunity(){return this.community;}

getCurrentUser()
{
  return this.userName;
}

getCurrentEmail()
{
  return this.userEmail;
}
getCurrentID()
{
  return this.userID;
}
getlogin()
{
  return this.isLoggedIn;
}


  login(username:HTMLInputElement, password:HTMLInputElement){

    this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).
    then((user)=>
    {
      this.userName = username.value;
      this.userEmail = user.email;
      this.userID = user.uid;
      this.connectType="mail";

       if (this.checkIfUser()==true)
           this.isLoggedIn=true;
      //  location.reload();  I dont think we need that - check :)
      
      
    })
    .catch((error)=>
    {
       alert("Email or password incorrect");
    });

    password.value=null;
    username.value=null;



  }


  logout(){
// this.anguarfireAuth.authState.subscribe(() => this.router.navigate(['']));
    // The composed observable completes, so there's no need to unsubscribe.
   this.anguarfireAuth.auth.signOut();
   this.isLoggedIn=false;
    this.title="home";
}

FBlogin(){
var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then((user)=>
{
 // this.isLoggedIn=true;
  this.userName = user.user.displayName;
  this.userEmail = user.user.email;
  this.userID = user.user.uid;
  this.connectType="facebook";

   if (this.checkIfUser()==true)
           this.isLoggedIn=true;

    //location.reload();      I dont think we need that - check :)
  
})
.catch((error)=>
{
    alert("Email or password incorrect");
});

}


GOGlogin(){
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then((user)=>
{
    this.connectType="google";
    this.userName = user.user.displayName;
    this.userEmail = user.user.email;
    this.userID = user.user.uid;

   if (this.checkIfUser()==true)
           this.isLoggedIn=true;

  console.log(this.isLoggedIn);
//  this.isLoggedIn=true;
 
  console.log(this.userID);

    //location.reload();      I dont think we need that - check :)
})
.catch((error)=>
{
    alert("Email or password incorrect");
});



  
}



TWITlogin(){

      this.connectType="twitter";

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










}