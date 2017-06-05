import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service.service';
import { DBprojectComponent } from '../.././DBproject/DBproject.component';



@Component({
  selector: 'app-master-db',
  templateUrl: './master-db.component.html',
  styleUrls: ['./master-db.component.css']
})
export class MasterDBComponent implements OnInit {

  constructor(private serviceService:ServiceService) { }

  ngOnInit() {this.serviceService.setTitle("Master DB");}

}

