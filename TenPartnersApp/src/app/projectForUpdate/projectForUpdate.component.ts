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

export class ProjectForUpdateComponent implements OnInit
{
  @Input() item;

  // variables
  private projectName: string;
  private updateDateFlag: boolean;
  private updateCostFlag: boolean;

  // pointers to object or list in firebase
  private projects: FirebaseListObservable<any>;
  private pointerToProjectInAF: any;
  private pointerToProjectObjectInAF: FirebaseObjectObservable<any>;
  private card:boolean;

//===================================  constructor  ============================================

  constructor(private router: Router, public af: AngularFireDatabase)
  {
    this.projects = this.af.list('projects');
    this.updateDateFlag = false;
    this.updateCostFlag = false;
    
  }

//====================================  ngOnInit()  ===============================================

  ngOnInit() 
  {
    this.pointerToProjectInAF = this.af.list(this.item); // item is a path
    this.pointerToProjectObjectInAF = this.af.object(this.item, { preserveSnapshot: true });
    this.projectName = this.pointerToProjectInAF.$ref.path.o[1]
  }

//================================= clickOnMyProjects  =================================

   clickOnMyProjects(event)
  {
    this.router.navigateByUrl('/'+event.currentTarget.id);
  }

//================================== remove project ====================================

  removeProject()
  {
    let meessage = "Are you sure you want to delete " +this.projectName+" project?";
    if(confirm(meessage))
    this.pointerToProjectObjectInAF.update({ 'associatedUser': ""});
  }

//================================== updating date ====================================
  
  updateDate()
  {
    this.updateDateFlag = true;
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
      this.pointerToProjectObjectInAF.update({ 'date': newDate }).then(
          x => { this.updateDateFlag = false; }
        );
    }
  }
  
//================================= updating cost ====================================
  
  updateCost()
  {
    this.updateCostFlag = true;
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
      this.pointerToProjectObjectInAF.update({ 'cost': newCost}).then(
          x => { this.updateCostFlag = false; }
      );
    }  
  } 

}