
//===============================  imports  ==================================

import {Routes} from '@angular/router';

// imports for pages
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { BoardComponent } from './pages/board/board.component';
import { VotingComponent } from './pages/voting/voting.component';
import { SettingsComponent } from './settings/settings.component';
import { SubmitProjectComponent } from './pages/submit-project/submit-project.component';


// import for items in pages -------> check if we need that here ---> I DONT THINK SO..
import { ProjectForVoteComponent } from './projectForVote/projectForVote.component';
import { ProjectForUpdateComponent } from './projectForUpdate/projectForUpdate.component';
import { ProjectForSelectComponent } from './projectForSelect/projectForSelect.component';



//===============================  defined paths  ==================================

export const appRoutes: Routes=
[
    {path:'', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'myProjects', component: MyProjectsComponent},
    {path:'board', component: BoardComponent},
    {path:'voting', component: VotingComponent},
    {path:'settings', component: SettingsComponent},
    {path:'SubmitProject', component: SubmitProjectComponent}



];