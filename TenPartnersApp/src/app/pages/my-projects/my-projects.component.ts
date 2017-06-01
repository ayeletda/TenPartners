import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../../service.service';


@Component(
{
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})

export class MyProjectsComponent implements OnInit 
{
  constructor(private router: Router,private serviceService:ServiceService) { }

  ngOnInit() {this.serviceService.setTitle("My Projects");}
}
  