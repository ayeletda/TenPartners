
//======================================  imports  ========================================
import { SidebarModule } from 'ng-sidebar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import * as $ from 'jquery';
 
// imports for pages
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { BoardComponent } from './pages/board/board.component';
import { VotingComponent } from './pages/voting/voting.component';
import { AddUserComponent } from './pages/add-user/add-user.component'

// import for items in pages
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectForVoteComponent } from './projectForVote/projectForVote.component';
import { ProjectForUpdateComponent } from './projectForUpdate/projectForUpdate.component';
import { ProjectForSelectComponent } from './projectForSelect/projectForSelect.component';
	
// imports for firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SubmitProjectComponent } from './pages/submit-project/submit-project.component';
import { MasterDBComponent } from './pages/master-db/master-db.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceService} from './service.service';
import { DBprojectComponent } from './dbproject/dbproject.component';
import { WaitForApprovalComponent } from './pages/wait-for-approval/wait-for-approval.component';
import { WaitingListComponent } from './pages/waiting-list/waiting-list.component';
//=============================================================================================

//Initialize Firebase
export const firebaseConfig = 
{
   apiKey: "AIzaSyBMzKXKKjDNxuOAU1v7o_hpSs1aZps-70I",
    authDomain: "application-5baf2.firebaseapp.com",
    databaseURL: "https://application-5baf2.firebaseio.com",
    projectId: "application-5baf2",
    storageBucket: "application-5baf2.appspot.com",
    messagingSenderId: "253653996545"
};

//==================================================================

@NgModule({
  declarations:
   [
      AppComponent,
      
      LoginComponent,
      HomeComponent,
      MyProjectsComponent,
      BoardComponent,
      VotingComponent,
      AddUserComponent,
      
      HeaderComponent,
      FooterComponent,
      ProjectForVoteComponent,
      ProjectForUpdateComponent,
      ProjectForSelectComponent,
      SubmitProjectComponent,
      MasterDBComponent,
      DBprojectComponent,
      WaitForApprovalComponent,
      WaitingListComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    SidebarModule.forRoot()    
  
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})



export class AppModule { }






