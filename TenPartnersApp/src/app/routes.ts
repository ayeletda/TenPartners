import {Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';


export const appRoutes: Routes=[
{path:'', component: LoginComponent},
{path:'home', component: HomeComponent},
{path:'settings', component: SettingsComponent},





];