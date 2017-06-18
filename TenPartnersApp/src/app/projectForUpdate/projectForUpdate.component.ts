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
  whatToPop:string;
  showDetailsForm: boolean;
//===================================  constructor  =================================================

  constructor( private router: Router, private af: AngularFireDatabase)
  {
    this.projectsFBList = this.af.list('projects');
    this.updateDateFlag = false;
    this.updateCostFlag = false;
    this.whatToPop="";
    this.showDetailsForm=false;
  }

//====================================  ngOnInit()  ==================================================

  ngOnInit() 
  {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.projectFBObject = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1]
  }


PopMassage()
{
  if(this.showDetailsForm==false)
  { 
         this.whatToPop="deletePop";
          this.showDetailsForm=true;
          return;

  }

  this.showDetailsForm =!this.showDetailsForm;
}

//================================= clickOnMyProjects  ===============================================

   clickOnMyProjects(event)
  {
    this.router.navigateByUrl('/' + event.currentTarget.id);
  }

//================================== remove project ==================================================

   removeProject()
  {
    this.projectFBObject.update({ 'associatedUser': ""});
  }

//================================== updating date ====================================================
  
   updateDate()
  {
    //if the user clicked on update cost first
    if(this.updateCostFlag)
    {
      alert("Save or cancel the new price")
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
      alert ("You should enter a valid date")
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
      alert("Save or cancel the new date")
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
      alert ("You should enter a valid budget")
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