import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule} from '@angular/router'; 
import {appRoutes} from './routes';
import { SettingsComponent } from './pages/settings/settings.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { BoardComponent } from './pages/board/board.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SettingsComponent,
    MyProjectsComponent,
    BoardComponent,
    BoardComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
