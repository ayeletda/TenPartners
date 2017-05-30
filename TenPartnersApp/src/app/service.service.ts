import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';




@Injectable()
export class ServiceService {
  username:String;
  password:String;
  private isLoggedIn;


  constructor(private router: Router, public anguarfireAuth:AngularFireAuth)
  {
    this.username='';
    this.password='';
  }



  getCurrentUser(){
    return this.username;
  }

getlogin(){
  return this.isLoggedIn;
}



  login(username:HTMLInputElement, password:HTMLInputElement){

    this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).
    then((user)=>
    {
      alert("Wellcom tenPartner");
      this.isLoggedIn=true;
      this.router.navigateByUrl('/home');
    })
    .catch((error)=>
    {
       alert("Email or password incorrect");
    });

    password.value=null;
    username.value=null;

  }


  logout(){
 this.anguarfireAuth.authState.subscribe(() => this.router.navigate(['']));
    // The composed observable completes, so there's no need to unsubscribe.
   this.anguarfireAuth.auth.signOut();
}

FBlogin(){
var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
    // Handle Errors here. 
});}


GOGlogin(){
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here. 
  // ...
});
}



TWITlogin(){

}



}
