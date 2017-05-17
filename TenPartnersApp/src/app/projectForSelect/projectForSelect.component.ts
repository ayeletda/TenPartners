import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component(
{
  selector: 'app-projectForSelect',
  templateUrl: './projectForSelect.component.html',
  styleUrls: ['./projectForSelect.component.css']
})

export class ProjectForSelectComponent implements OnInit 
{
  constructor(private router: Router) {}

  ngOnInit() {}
}