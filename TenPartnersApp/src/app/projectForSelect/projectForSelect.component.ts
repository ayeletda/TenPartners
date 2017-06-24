import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AfterViewChecked, ElementRef, ViewChild, Component, OnInit, EventEmitter} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ChangeDetectorRef, Input, Output} from "@angular/core";
import { ServiceService } from '../service.service';

@Component(
    {
        selector: 'app-projectForSelect',
        templateUrl: './projectForSelect.component.html',
        styleUrls: ['./projectForSelect.component.css']
    })

export class ProjectForSelectComponent implements OnInit, AfterViewChecked 
{
    @Input() item;
    @Input() project;
    @Output() voteChoose: EventEmitter<any> = new EventEmitter();

    @ViewChild('forVal') private forVal: any;
    @ViewChild('avoidVal') private avoidVal: any;
    @ViewChild('againstVal') private againstVal: any;

    votingFor: boolean;
    votingFirstTime: boolean; // saves if it the first time that person voting (true) or not (false)
    private projects: FirebaseListObservable<any>;
    projectInCommunityFBList: any;
    projectInCommunityFBObject: any;
    projectName: string;
    projectUplodeDate: Date;


    constructor(private router: Router, private service: ServiceService, private af: AngularFireDatabase) 
    {
        this.projects = this.af.list('projects');

        (<any>$(".stopper")).each(function (k, v) 
        {
            if (v.textContent.trim().match(/^\d{13}$/) !== null) 
            {
                let date = new Date(parseInt(v.textContent) + (14 * 60 * 60 * 24 * 1000));
                //let date = new Date(parseInt(v.textContent));

                (<any>$(v)).countdown(date, function (event) 
                {
                    $(this).text(event.strftime('%D:%H:%M:%S'));
                }).on('finish.countdown', function () 
                {
                  this.project.associatedCommunity = "";
                   //TODO: timer done
                });
            } 
            else 
            {
               // console.log(v.textContent.trim().match(/^\d{13}$/));
            }
        });
    }

    ngOnInit() 
    {
        this.projectInCommunityFBList = this.af.list(this.item); // item is a path
        this.projectInCommunityFBObject = this.af.object(this.item, {preserveSnapshot: true});
        this.projectUplodeDate = this.project.uploudDate;

        //initializes projectName
        let projectKey = this.projectInCommunityFBList.$ref.path.o[1];
        let projectFBList = this.af.list("projects/" + projectKey);
    
        let temp0 = projectFBList.subscribe(snapshots => 
        {
        snapshots.forEach(snapshot => 
        {
            if (snapshot.$key == 'name')
            this.projectName = snapshot.$value;
        });
        });
        
        //pushes subscribe to an array for freeing it (listener to firebase) when login-out
        this.service.allSubscribe.push(temp0);
    }


    ngAfterViewChecked() {}
}
