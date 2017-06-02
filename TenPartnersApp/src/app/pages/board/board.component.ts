import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../../service.service';


import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";


@Component(
    {
        selector: 'app-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css']
    })


export class BoardComponent implements OnInit {
    savedDate: string = '';
    user: FirebaseListObservable<any>;
    projects: FirebaseListObservable<any>;
    associatedCommunities: FirebaseListObservable<any>;
    userId: string;
    userCommunity: string;
    currentProject: any = '';
    currentProjectValues: any = '';
    projectPath: any = '';
    projectSelected:boolean;
    constructor(private router: Router,private service:ServiceService, public af: AngularFireDatabase) {

        this.userId = this.service.getCurrentID();
        this.user = this.af.list('users/' + this.userId); // the specific user

        this.user.subscribe((snapshots)=>{
            snapshots.forEach(snapshot => {
                if (snapshot.$key == 'associatedCommunity')
                    this.userCommunity = snapshot.$value;

            });
        })
        this.projects = this.af.list('projects');

        this.projects.subscribe((snapshots)=>{
            snapshots.forEach(snapshot => {
                // array.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
                // array2.push(snapshot);
                this.associatedCommunities = this.af.list('projects/' + snapshot.$key + '/associatedCommunities');
                this.currentProjectValues = snapshot;

            });
        })
        this.projectSelected = false;

    }

    ngOnInit() {


        this.service.setTitle("Suggested projects");

        (<any>$('#SuggestedProjects')).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false
        });
    }
    saveProjectPath(project)
    {
        this.projectPath = 'projects/' + this.currentProjectValues.$key + '/associatedCommunities/' + project.$key;
        return true;
    }

    loadProjectDetails(project)
    {
        this.currentProject = project;
        this.projectSelected = false;
    }
    updateAssociatedUser(project){
        this.projectSelected = true;
        this.currentProject = project;
        this.currentProject.update({'associatedUser': this.currentProject.userID});
    }


}






























/*



import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../../service.service';


@Component(
    {
        selector: 'app-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css']
    })


export class BoardComponent implements OnInit {
    constructor(private router: Router,private serviceService:ServiceService) {
    }

    ngOnInit() {


        this.serviceService.setTitle("Suggested projects");

        (<any>$('#SuggestedProjects')).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false
        });
    }

    clicked(event) {

        this.router.navigateByUrl('/masterDB');

    }
}
 */