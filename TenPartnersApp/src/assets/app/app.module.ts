import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
 
//imports for the pages
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { BoardComponent } from './pages/board/board.component';
import { VotingComponent } from './pages/voting/voting.component';
import { VotingProjectComponent } from './votingProject/votingProject.component';
	
	//imports for the firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

//=====================================================

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
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyProjectsComponent,
    BoardComponent,
    VotingComponent,
    VotingProjectComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }






