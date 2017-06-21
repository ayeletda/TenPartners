import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//========================= HomeComponent class ==================================================================

export class HomeComponent implements OnInit 
{
  adcommunity: string;
  community: string;
  communitiesFBList: FirebaseListObservable<any>;
  adcommunityFBList: FirebaseListObservable<any>;
  usersArr: any;
  usersFBList: any;
  whatToDrop:any;
  doesNeedPop: boolean;
  whatToPop: string;
  editUserStatus:boolean;
  updateNameFlag:boolean;
  updateCommunityFlag:boolean;
  updateEmailFlag:boolean;
  updateGoogleFlag:boolean;
  updateFacebookFlag:boolean;
  updateTwitterFlag:boolean;
  //=========================  constructor  =====================================================================

  constructor( private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
  {
    this.communitiesFBList = this.af.list('communities',{ preserveSnapshot: true });
    this.adcommunityFBList = this.af.list('communities');
    this.usersFBList = this.af.list('users');
    this.adcommunity = '';
    this.whatToDrop="";
    this.doesNeedPop=false;
    this.whatToPop="";
    this.editUserStatus=false;

    this.updateNameFlag=false;
    this.updateCommunityFlag=false;
    this.updateEmailFlag=false;
    this.updateFacebookFlag=false;
    this.updateGoogleFlag=false;
    this.updateTwitterFlag=false;

    let temp = this.usersFBList.subscribe((snapshots)=>
    {
      this.usersArr = [];
      snapshots.forEach(snapshot => 
      {
        this.usersArr.push(snapshot);
      });
    })
      this.service.allSubscribe.push(temp);

  }

  //==========================  ngOnInit  =======================================================================
  
  ngOnInit() 
  {
    this.service.setTitle("Home");
  }

  //========================== addCommunity ======================================================================

  addCommunity() 
  {
    if (this.adcommunity == '') 
    {
      this.whatToPop="communityEmpty";
      this.doesNeedPop=true;
      return;
    }
    else if (!this.doesCommunityExist()) 
    {
      this.communitiesFBList.update(this.adcommunity, {name: this.adcommunity});
      //this.communitiesFBList.push({ name: this.adcommunity });
      this.whatToPop="communityAdd";
      this.doesNeedPop=true;
    }
    else 
    {
      this.whatToPop="communityExist";
      this.doesNeedPop=true;
    }
          this.adcommunity = '';
  }

  //====================== doesCommunityExist =====================================================================

  doesCommunityExist() 
  {
    let status = false;
    let temp = this.communitiesFBList.subscribe((snapshots) => 
    {
      snapshots.some(snapshot => 
      {        
        if (snapshot.val().name == this.adcommunity) 
          status=true;
      });
    });

    this.service.allSubscribe.push(temp);

    return status;
  }

//====================== deleteCommunity =====================================================================

  deleteCommunity(communityKey: string) 
  {
  this.doesNeedPop=false;
  this.whatToDrop="";
  const itemObservable = this.af.object("communities/" + communityKey);
  itemObservable.remove();

  let temp = this.usersFBList.subscribe((snapshots)=>
    {
      snapshots.forEach(snapshot => 
      {
        if(snapshot.associatedCommunity==communityKey)
              this.deleteUser(snapshot);
            
            
      });
    })
      this.service.allSubscribe.push(temp);

  }

//====================== deleteUser =====================================================================

  deleteUser(user) 
  {
  this.doesNeedPop=false;
  this.whatToDrop="";
  let userKey = user.$key; 
  const itemObservable = this.af.object("users/" + userKey);
  itemObservable.remove();

  }

//====================== showDropdow =====================================================================

  showDropdow(user)
  {
    if(this.whatToDrop==user)
        this.whatToDrop="";

    else this.whatToDrop=user;
  }
  



PopMassage(pop:string)
{
  this.whatToPop=pop;
  this.doesNeedPop =!this.doesNeedPop;
}


updateName()
  {
    //if the user clicked on update cost flag and enter a cost
    if(this.updateNameFlag)
    {
      this.whatToPop="save/cancelName";
      this.doesNeedPop=true; 
    }

    else
    {
      this.updateNameFlag = true;
    }
  }


OKupdateName(NameVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateNameFlag = false;
    }
    else if(NameVal == "")
    {
      this.whatToPop="validName";
      this.doesNeedPop=true;
    }
    else
    {
      let newName = NameVal;
      const itemObservable = this.af.object("users/" + this.whatToDrop.$key);
      itemObservable.update({ 'name': newName}).then(
          x => { this.updateNameFlag = false; }
      );
    }  
  } 

////////////////////////////////////////
updateCommunity()
  {
    //if the user clicked on update cost flag and enter a cost
    if(this.updateCommunityFlag)
    {
      this.whatToPop="save/cancelCommunity";
      this.doesNeedPop=true; 
    }

    else
    {
      this.updateCommunityFlag = true;
    }
  }


OKupdateCommunity(CommunityVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateCommunityFlag = false;
    }
    else if(CommunityVal == "")
    {
      this.whatToPop="validCommunity";
      this.doesNeedPop=true;
    }
    else
    {
      this.whatToDrop="";
      let newCommunity= CommunityVal;
       this.communitiesFBList.update(newCommunity, {name: newCommunity});
      const itemObservable = this.af.object("users/" + this.whatToDrop.$key);
      itemObservable.update({ 'associatedCommunity': newCommunity}).then(
          x => { this.updateCommunityFlag = false; }
      );
    }  
  } 



////////////////////////////////////////
updateEmail()
  {
    //if the user clicked on update cost flag and enter a cost
    if(this.updateEmailFlag)
    {
      this.whatToPop="save/cancelEmail";
      this.doesNeedPop=true; 
    }

    else
    {
      this.updateEmailFlag = true;
    }
  }


OKupdateEmail(EmailVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateEmailFlag = false;
    }
    else if(EmailVal == "")
    {
      this.whatToPop="validEmail";
      this.doesNeedPop=true;
    }
    else
    {
      let newEmail= EmailVal;
      const itemObservable = this.af.object("users/" + this.whatToDrop.$key);
      itemObservable.update({ 'email': newEmail}).then(
          x => { this.updateEmailFlag = false; }
      );
    }  
  } 

/////////////////////////////////////////////////////////

updateGoogle()
  {
    //if the user clicked on update cost flag and enter a cost
    if(this.updateGoogleFlag)
    {
      this.whatToPop="save/cancelGoogle";
      this.doesNeedPop=true; 
    }

    else
    {
      this.updateGoogleFlag = true;
    }
  }


OKupdateGoogle(GoogleVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateGoogleFlag = false;
    }
    else if(GoogleVal == "")
    {
      this.whatToPop="validGoogle";
      this.doesNeedPop=true;
    }
    else
    {
      let newGoogle= GoogleVal;
      const itemObservable = this.af.object("users/" + this.whatToDrop.$key);
      itemObservable.update({ 'google': newGoogle}).then(
          x => { this.updateGoogleFlag = false; }
      );
    }  
  } 
/////////////////////////////////////////////


/////////////////////////////////////////////////////////

updateFacebook()
  {
    //if the user clicked on update cost flag and enter a cost
    if(this.updateFacebookFlag)
    {
      this.whatToPop="save/cancelFacebook";
      this.doesNeedPop=true; 
    }

    else
    {
      this.updateFacebookFlag = true;
    }
  }


OKupdateFacebook(FacebookVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateFacebookFlag = false;
    }
    else if(FacebookVal == "")
    {
      this.whatToPop="validFacebook";
      this.doesNeedPop=true;
    }
    else
    {
      let newFacebook= FacebookVal;
      const itemObservable = this.af.object("users/" + this.whatToDrop.$key);
      itemObservable.update({ 'facebook': newFacebook}).then(
          x => { this.updateFacebookFlag = false; }
      );
    }  
  } 
/////////////////////////////////////////////

updateTwitter()
  {
    //if the user clicked on update cost flag and enter a cost
    if(this.updateTwitterFlag)
    {
      this.whatToPop="save/cancelTwitter";
      this.doesNeedPop=true; 
    }

    else
    {
      this.updateTwitterFlag = true;
    }
  }


OKupdateTwitter(TwitterVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateTwitterFlag = false;
    }
    else if(TwitterVal == "")
    {
      this.whatToPop="validTwitter";
      this.doesNeedPop=true;
    }
    else
    {
      let newTwitter= TwitterVal;
      const itemObservable = this.af.object("users/" + this.whatToDrop.$key);
      itemObservable.update({ 'twitter': newTwitter}).then(
          x => { this.updateTwitterFlag = false; }
      );
    }  
  } 



editUser(){
  this.editUserStatus=!this.editUserStatus;
}


}













/*

What we do with Yonatan:
on SubmitProjectComponent.ts:

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";


@Component({
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.css']
})
export class SubmitProjectComponent implements OnInit {
public projects: FirebaseListObservable<any>;
public newProject: string;
  constructor( router: Router, public af: AngularFireDatabase)
   {
  this.projects = this.af.list('projects'); //= select * from projects 

    this.projects.push({game:{goal:'great'}}); //= select * from projects 
 this.projects.lift
    //this.newProject = '';
    }

  ngOnInit() {
  }

}





*/
