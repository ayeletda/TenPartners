import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDBComponent } from './master-db.component';

describe('MasterDBComponent', () => {
  let component: MasterDBComponent;
  let fixture: ComponentFixture<MasterDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
