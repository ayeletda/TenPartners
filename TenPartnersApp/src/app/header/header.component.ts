import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component
({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit 
{
  constructor(private router: Router) { }

  @Input()item;

  ngOnInit() {}
  
  logOut(){
    console.log("home");

    this.router.navigateByUrl('');
  }

goHome(){
    this.router.navigateByUrl('/home');
  
}



}
