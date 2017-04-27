import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  
  clicked(event){
    console.log(event.currentTarget.id);
    this.router.navigateByUrl('/'+event.currentTarget.id);

  }


}
