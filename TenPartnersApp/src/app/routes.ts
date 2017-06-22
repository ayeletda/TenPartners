
//===============================  imports  ==================================

import {Routes} from '@angular/router';

// imports for users pages
import { LoginComponent } from './pages/login/login.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { BoardComponent } from './pages/board/board.component';
import { VotingComponent } from './pages/voting/voting.component';
import { SubmitProjectComponent } from './pages/submit-project/submit-project.component';
import { MasterDBComponent } from './pages/master-db/master-db.component';
import { WaitForApprovalComponent } from './pages/wait-for-approval/wait-for-approval.component';
import { WaitingListComponent } from './pages/waiting-list/waiting-list.component';


// imports for admin pages
import { HomeComponent } from './pages/home/home.component';
import { AddUserComponent } from './pages/add-user/add-user.component';


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
    {path:'SubmitProject', component: SubmitProjectComponent},
    {path:'masterDB', component: MasterDBComponent},
    {path:'addUser', component: AddUserComponent},
    {path:'wait', component: WaitForApprovalComponent},
    {path:'waitingList', component:WaitingListComponent}
    



];