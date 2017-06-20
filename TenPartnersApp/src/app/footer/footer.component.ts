import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../service.service';


@Component(
{
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
//============================================= FooterComponent class ===============================================================

export class FooterComponent implements OnInit 
{
   user;
   isClick: string;
 
  //================================================  constructor  ============================================================

  constructor( private router: Router, private service:ServiceService) 
  {
    //function (in servic.component.ts) that returns a pointer to user object that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.user = this.service.getUser();
  }

  //=================================================  ngOnInit  ============================================================

  ngOnInit() 
  {
    if (this.user.permission == '2')
      this.isClick='voting';
    else  this.isClick='home';
  }
  
  //=================================================  clicked  ============================================================

  clicked(event)
  {
    this.isClick = event.currentTarget.id;
    this.router.navigateByUrl('/'+event.currentTarget.id);
  }

}
