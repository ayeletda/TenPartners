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
  private user = { id: null, permission: null, community: null, name: null, email: null };
  private isClick: string;
 
  //================================================  constructor  ============================================================

  constructor(private router: Router,private service:ServiceService) 
  {
    //function (in servic.component.ts) that includs subscribe that listen to firebase and initializes the variabels: userId, userCommunity, name, email 
    this.service.getDetails(this.user);
  }

  //=================================================  ngOnInit  ============================================================

  ngOnInit() 
  {
    if (this.service.getPermission()=='2')
      this.isClick='voting';
    else  this.isClick='home';
  }
  
  //=================================================  clicked  ============================================================

  private clicked(event)
  {
    this.isClick = event.currentTarget.id;
    this.router.navigateByUrl('/'+event.currentTarget.id);
  }

}
