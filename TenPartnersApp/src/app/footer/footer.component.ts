import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../service.service';


@Component(
{
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit 
{
  private isClick:string;

 constructor(private router: Router,private serviceService:ServiceService) { }

  ngOnInit() {
    if (this.serviceService.getPermission()=='2')
      this.isClick='voting';
    else  this.isClick='home';
  }
  
  private clicked(event){
    this.isClick = event.currentTarget.id;
    this.router.navigateByUrl('/'+event.currentTarget.id);

  }

}
