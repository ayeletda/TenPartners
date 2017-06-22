import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForApprovalComponent } from './wait-for-approval.component';

describe('WaitForApprovalComponent', () => {
  let component: WaitForApprovalComponent;
  let fixture: ComponentFixture<WaitForApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
