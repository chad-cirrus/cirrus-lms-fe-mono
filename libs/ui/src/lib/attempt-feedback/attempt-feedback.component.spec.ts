import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptFeedbackComponent } from './attempt-feedback.component';
import { Attempt } from '@cirrus/models';

describe('AttemptFeedbackComponent', () => {
  let component: AttemptFeedbackComponent;
  let fixture: ComponentFixture<AttemptFeedbackComponent>;
  let attempt: Attempt = {
    attempt_type: '',
    content_id: 0,
    course_attempt_id: 0,
    course_id: 0,
    created_at: '',
    id: 0,
    instructor_name: '',
    lesson_id: 0,
    failed: false,
    success: false,
    perfect: false,
    stage_id: 0,
    standards_missed: [],
    task_id: 0,
    task_name: '',
    user_id: 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemptFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptFeedbackComponent);
    component = fixture.componentInstance;
    component.attempt = attempt;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
