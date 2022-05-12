import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptFeedbackComponent } from './attempt-feedback.component';

describe('AttemptFeedbackComponent', () => {
  let component: AttemptFeedbackComponent;
  let fixture: ComponentFixture<AttemptFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
