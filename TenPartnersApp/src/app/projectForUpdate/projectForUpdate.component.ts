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
  private projectName: string;

  // pointers to object or list in firebase
  private projectsFBList: FirebaseListObservable<any>;
  private pointerToProjectInAF: any;
  private projectFBObject: FirebaseObjectObservable<any>;

  // flags
  private card: boolean;
  private updateDateFlag: boolean;
  private updateCostFlag: boolean;

//===================================  constructor  =================================================

  constructor(private router: Router, public af: AngularFireDatabase)
  {
    this.projectsFBList = this.af.list('projects');
    this.updateDateFlag = false;
    this.updateCostFlag = false;
  }

//====================================  ngOnInit()  ==================================================

  ngOnInit() 
  {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.projectFBObject = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1]
  }

//================================= clickOnMyProjects  ===============================================

  private clickOnMyProjects(event)
  {
    this.router.navigateByUrl('/' + event.currentTarget.id);
  }

//================================== remove project ==================================================

  private removeProject()
  {
    let meessage = "Are you sure you want to delete " + this.projectName + " project?";
    if(confirm(meessage))
    this.projectFBObject.update({ 'associatedUser': ""});
  }

//================================== updating date ====================================================
  
  private updateDate()
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

  private OKupdateDate(dateVal, isNeedUpdate)
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
  
  private updateCost()
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

  private OKupdateCost(costVal, isNeedUpdate)
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