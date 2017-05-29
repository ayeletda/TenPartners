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
  private isClick:boolean;

 constructor(private router: Router) { }

  ngOnInit() {}
  
  clicked(event){
    console.log(event.currentTarget.id);
    this.isClick = event.currentTarget.id;
    this.router.navigateByUrl('/'+event.currentTarget.id);

  }

}
