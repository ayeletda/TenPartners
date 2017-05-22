import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProjectComponent } from './submit-project.component';

describe('SubmitProjectComponent', () => {
  let component: SubmitProjectComponent;
  let fixture: ComponentFixture<SubmitProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
