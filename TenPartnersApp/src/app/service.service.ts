import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';




@Injectable()
export class ServiceService {
  userName:string;
  userEmail:string;
 // password:String; I dont think we need that - check :)
  private isLoggedIn;


  constructor(private router: Router, public anguarfireAuth:AngularFireAuth)
  {
    this.logout(); 
    this.userName ='';
    this.userEmail = '';
  //  this.password=''; I dont think we need that - check :)
    this.isLoggedIn=false;
  }



getCurrentUser()
{
  return this.userName;
}

getCurrentEmail()
{
  return this.userEmail;
}

getlogin()
{
  return this.isLoggedIn;
}



  login(username:HTMLInputElement, password:HTMLInputElement){

    this.anguarfireAuth.auth.signInWithEmailAndPassword(username.value, password.value).
    then((user)=>
    {
      alert("Wellcom tenPartner");
      this.userName = username.value;
      this.userEmail = user.email;
      this.isLoggedIn=true;
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
 this.anguarfireAuth.authState.subscribe(() => this.router.navigate(['']));
    // The composed observable completes, so there's no need to unsubscribe.
   this.anguarfireAuth.auth.signOut();
   this.isLoggedIn=false;
}

FBlogin(){
var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then((user)=>
    {
      alert("Wellcom tenPartner");
 
      this.isLoggedIn=true;
      this.router.navigateByUrl('/home');
       // location.reload(); I dont think we need that - check :)
        console.log(user);
      
        // maybe is this, you need to check after loging with face will work
        //   this.userName = user.user.displayName;
        // this.userEmail = user.user.email;
      
    })
    .catch((error)=>
    {
       alert("Email or password incorrect");
    });}


GOGlogin(){
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then((user)=>
{
  alert("Wellcom tenPartner");
  this.isLoggedIn=true;
    this.userName = user.user.displayName;
    this.userEmail = user.user.email;
  this.router.navigateByUrl('/home');
  
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
