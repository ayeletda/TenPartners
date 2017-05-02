import {Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { BoardComponent } from './pages/board/board.component';
import { VotingComponent } from './pages/voting/voting.component';
import { VotingProjectComponent } from './votingProject/votingProject.component';

export const appRoutes: Routes=[
{path:'', component: LoginComponent},
{path:'home', component: HomeComponent},
{path:'settings', component: SettingsComponent},
{path:'board', component: BoardComponent},
{path:'voting', component: VotingComponent},
{path:'votingProject', component: VotingProjectComponent}
];