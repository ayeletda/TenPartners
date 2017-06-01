import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service';

@Component({
  selector: 'app-submit-project',
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.css']
})
export class SubmitProjectComponent implements OnInit {

  constructor(private serviceService:ServiceService) { }

  ngOnInit() {this.serviceService.setTitle("Submit Project");}

}
