import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component(
{
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit 
{
 constructor(private router: Router) { }

  ngOnInit() {}
  
  clicked(event){
    console.log(event.currentTarget.id);
    if(event.currentTarget.id=="add")
      window.location.href='http://www.google.com/';

   else this.router.navigateByUrl('/'+event.currentTarget.id);

  }

}
