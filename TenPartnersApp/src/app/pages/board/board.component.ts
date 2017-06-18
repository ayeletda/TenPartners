import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AfterViewChecked, ElementRef, ViewChild, Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ChangeDetectorRef,Input} from "@angular/core";
import {ServiceService} from '../../service.service';

@Component(
{
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})

//====================  Board class  ============================================================

export class BoardComponent implements OnInit 
{
    @Input()path;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    //user's details
    private user = { id: null, permission: null, community: null, name: null, email: null };

    //project's details
    private currentProject: any;
    private currentI: any;
    private projectPath: any;
    private cost: number;
    private date: Date;
    private purpose: string;
    private description: string;

    private savedDate: string;
    private newMessage: string;
    private projectUpdate: FirebaseObjectObservable<any>;

    //determined according to customer
    private maxVotingNum: number;    

    // pointers of object or list in firebase
    private projects: FirebaseListObservable<any>;
    private projectsAssociatedCommunities_Arr: any;
    private projectsValues_Arr: any;
    private needViewMore: boolean;
    private usersVotingList: FirebaseListObservable<any>;
    private pointerToProjectObjectInAF: FirebaseObjectObservable<any>;

    //flags
    private showDetailsForm: boolean;
    private noProjects:boolean;
    private projectSelected: boolean;
    private firstTimeOfScoller: boolean;


    //====================  constructor  ============================================================

    constructor(private router: Router, private service: ServiceService, public af: AngularFireDatabase) 
    {    
        //initializes with defult values
        this.newMessage = '';
        this.savedDate = '';
        this.currentProject = '';
        this.projectPath = '';
        this.projectSelected = false;
        this.firstTimeOfScoller = true;
        this.showDetailsForm = false;
        this.noProjects= true;
        this.maxVotingNum = 10;

        //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
        this.service.getDetails(this.user);

        //initialize arrays
        this.projects = this.af.list('projects');

        let temp2 = this.projects.subscribe((snapshots) => 
        {
            this.projectsAssociatedCommunities_Arr = [];
            this.projectsValues_Arr = [];

            snapshots.forEach(snapshot => 
            {
                this.projectsAssociatedCommunities_Arr.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
                this.projectsValues_Arr.push(snapshot);
            });
        });

        //pushes subscribe to an array for freeing it (listener to firebase) when login-out
       this.service.allSubscribe.push(temp2);
    }

    //===================  ngOnInit  ============================================================

    ngOnInit() 
    {
        this.scrollToBottom()
        this.service.setTitle("Submitted Projects");
    }

    //================  saveProjectPath  =========================================================

    private saveProjectPath(project, i) 
    {
        this.projectPath = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
        this.noProjects = false;
        return true;
    }

    //===============  loadProjectDetails  =========================================================

    private loadProjectDetails(project, i) 
    {
        this.currentProject = project;
        this.currentI = i;
        let projectPathH = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/'+project.$key;
        this.projectUpdate = this.af.object(projectPathH,{preserveSnapshot:true});
        this.projectSelected = true;

        this.cost = project.cost;
        this.date = project.date;
        this.purpose = this.projectsValues_Arr[i].purpose;
        this.description = this.projectsValues_Arr[i].description;
        this.needViewMore=false;
        this.usersVotingList = this.af.list('projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/'+project.$key + "/votingList");
    }

    //==================  chooseProject  ============================================================

    private chooseProject()
    {
        this.showDetailsForm = true;
    }

    private updateDetails() 
    {
        //updating project's details
        this.projectUpdate.update({'associatedUser': this.user.id });
        this.projectUpdate.update({ 'uploudDate': new Date().getTime() });
        this.projectUpdate.update({ 'date': this.date });
        this.projectUpdate.update({ 'cost': this.cost });
        this.projectUpdate.update({ 'for': '1' });
        this.projectUpdate.update({ 'avoid': this.maxVotingNum - 1 });
        this.projectUpdate.update({ 'against': '0' });

        //updating voteStatus
        this.usersVotingList.update(this.user.id, { vote: "for"});

        this.close();
    }

    //===================== close  ============================================================

    private close() 
    {
        this.showDetailsForm = false;
        this.currentI = -1;
    }

    //===============   scrollToBottom  =========================================================

    private scrollToBottom(): void 
    {
        // if(this.firstTimeOfScoller == true)
        // {
        try 
        {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {}
        this.firstTimeOfScoller = false;
        //  }
        console.log("in scrollToBottom");

    }

    //===================   viewMore  =========================================================

    private viewMore(bol)
    {
        this.needViewMore = bol;
    }
}


