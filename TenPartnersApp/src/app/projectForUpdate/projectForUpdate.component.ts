import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectForUpdate',
  templateUrl: './projectForUpdate.component.html',
  styleUrls: ['./projectForUpdate.component.css']
})

export class ProjectForUpdateComponent implements OnInit 
{
  constructor(private router: Router) {}

  ngOnInit() {}

 clickOnMyProjects(event)
  {
    this.router.navigateByUrl('/'+event.currentTarget.id);
  }


}