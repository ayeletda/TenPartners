import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-wait-for-approval',
  templateUrl: './wait-for-approval.component.html',
  styleUrls: ['./wait-for-approval.component.css']
})
export class WaitForApprovalComponent implements OnInit {

  constructor( private service: ServiceService) { }

  ngOnInit() {
  }

}
