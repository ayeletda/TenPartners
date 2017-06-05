import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DBprojectComponent } from './dbproject.component';

describe('DBprojectComponent', () => {
  let component: DBprojectComponent;
  let fixture: ComponentFixture<DBprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DBprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DBprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
