import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username:string = '';
  password:string = '';

clicked(){
this.username =null;
this.password = null;
}



}
