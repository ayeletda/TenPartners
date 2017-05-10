import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  clickOnMyProjects(event){
    this.router.navigateByUrl('/'+event.currentTarget.id);
  }

}
