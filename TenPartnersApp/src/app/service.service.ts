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
  userID:any;
 // password:String; I dont think we need that - check :)
  private isLoggedIn;
  private title;
  users: FirebaseListObservable<any>;
  usersValues_Arr: any;


  constructor(private router: Router, public anguarfireAuth:AngularFireAuth,public af: AngularFireDatabase)
  {
    this.logout(); 
    this.userName ='';
    this.userEmail = '';
    this.userID='';
  //  this.password=''; I dont think we need that - check :)
    this.isLoggedIn=false;

     this.users = this.af.list('users');

    this.users.subscribe((snapshots)=>{
              this.usersValues_Arr=[];
      snapshots.forEach(snapshot => {
   //////////// mybe in oninit
        this.usersValues_Arr.push(snapshot);});})
    
    
  }

setTitle(Title:String){this.title=Title;}  



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

pushUser()
{

    console.log(this.getlogin());

    if(this.getlogin()==true)
        this.users.push({Name: this.getCurrentUser() , Email: this.getCurrentEmail(),associatedCommunity: "NULL"});
  }


  login(username:HTMLInputElement, password:HTMLInputElement){

    this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).
    then((user)=>
    {
      alert("Wellcom tenPartner");
      this.userName = username.value;
      this.userEmail = user.email;
      this.userID = user.uid;
      this.isLoggedIn=true;
      this.pushUser();
      this.router.navigateByUrl('/home');
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
  alert("Wellcom tenPartner");
  this.isLoggedIn=true;
  this.userName = user.user.displayName;
  this.userEmail = user.user.email;
  this.userID = user.user.uid;
  this.router.navigateByUrl('/home');
  this.pushUser();

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
  alert("Wellcom tenPartner");
  this.isLoggedIn=true;
  this.userName = user.user.displayName;
  this.userEmail = user.user.email;
  this.userID = user.user.uid;
  this.router.navigateByUrl('/home');
  this.pushUser();

    //location.reload();      I dont think we need that - check :)
  
})
.catch((error)=>
{
    alert("Email or password incorrect");
});



  
}



TWITlogin(){

}










}