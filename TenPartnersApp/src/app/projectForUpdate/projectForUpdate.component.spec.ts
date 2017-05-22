/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProjectForUpdateComponent } from './projectForUpdate.component';

describe('ProjectForUpdateComponent', () => 
{
  let component: ProjectForUpdateComponent;
  let fixture: ComponentFixture<ProjectForUpdateComponent>;

  beforeEach(async(() => 
  {
    TestBed.configureTestingModule(
    {
      declarations: [ ProjectForUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(ProjectForUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => 
  {
    expect(component).toBeTruthy();
  });
});

