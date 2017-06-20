
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ChangeDetectorRef, Input, Output} from "@angular/core";

@Component(
{
  selector: 'app-projectForUpdate',
  templateUrl: './projectForUpdate.component.html',
  styleUrls: ['./projectForUpdate.component.css']
})

//=============================  ProjectForUpdate class ============================================

export class ProjectForUpdateComponent implements OnInit
{
  @Input() item;
  
  // variables
  projectName: string;

  // pointers to object or list in firebase
  projectsFBList: FirebaseListObservable<any>;
  pointerToProjectInAF: any;
  projectFBObject: FirebaseObjectObservable<any>;

  // flags
  card: boolean;
  updateDateFlag: boolean;
  updateCostFlag: boolean;
  doesNeedPop: boolean;
  whatToPop: string;
  
  //===================================  constructor  =================================================

  constructor( private router: Router, private af: AngularFireDatabase)
  {
    this.projectsFBList = this.af.list('projects');
    this.updateDateFlag = false;
    this.updateCostFlag = false;
    this.whatToPop = "";
    this.doesNeedPop=false;
  }

  //====================================  ngOnInit  ==================================================

  ngOnInit() 
  {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.projectFBObject = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1]
  }

  //====================================  PopMassage  ==================================================

  PopMassage()
  {
    if(this.doesNeedPop == false)
    { 
      this.whatToPop = "deletePop";
      this.doesNeedPop = true;
      return;
    }
    this.doesNeedPop =! this.doesNeedPop;
  }

  //================================= clickOnMyProjects  ===============================================

  clickOnMyProjects(event)
  {
    this.router.navigateByUrl('/' + event.currentTarget.id);
  }

  //================================== remove project ==================================================
  //removes the project from the voting list & reset its messages & votingList

  removeProject()
  {
    this.af.list ( this.item + "/messages").remove();
    this.af.list (this.item + "/votingList").remove();
    this.projectFBObject.update({ 'associatedUser': '' }); 
    this.projectFBObject.update({ 'cost': '' });
    this.projectFBObject.update({ 'date': '' });
  }

  //================================== updating date ====================================================
  
  updateDate()
  {
    //if the user clicked on update cost first
    if(this.updateCostFlag)
    {
      this.whatToPop="save/cancelPrice"
      this.doesNeedPop=true; 
    }
    else
    {
      this.updateDateFlag = true;
    }
  }

  OKupdateDate(dateVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateDateFlag = false;
    }
    else if(dateVal == "")
    {
      this.whatToPop="validDate";
      this.doesNeedPop=true;
    }
    else
    {
      let newDate = dateVal;
      this.projectFBObject.update({ 'date': newDate }).then(
          x => { this.updateDateFlag = false; }
        );
    }
  }
  
  //================================= updating cost ============================================================
  
  updateCost()
  {
    //if the user clicked on update cost flag and enter a cost
    if(this.updateDateFlag)
    {
      this.whatToPop="save/cancelDate";
      this.doesNeedPop=true; 
    }
    else
    {
      this.updateCostFlag = true;
    }
  }

  OKupdateCost(costVal, isNeedUpdate)
  {
    if(!isNeedUpdate)
    {
      this.updateCostFlag = false;
    }
    else if(costVal == "" || costVal < 0)
    {
      this.whatToPop="validBudget";
      this.doesNeedPop=true;
    }
    else
    {
      let newCost = costVal;
      this.projectFBObject.update({ 'cost': newCost}).then(
          x => { this.updateCostFlag = false; }
      );
    }  
  } 

}