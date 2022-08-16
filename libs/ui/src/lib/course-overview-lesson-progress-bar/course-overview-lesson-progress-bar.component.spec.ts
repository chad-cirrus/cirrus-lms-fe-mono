import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOverviewLessonProgressBarComponent } from './course-overview-lesson-progress-bar.component';

describe('CourseOverviewLessonProgressBarComponent', () => {
  let component: CourseOverviewLessonProgressBarComponent;
  let fixture: ComponentFixture<CourseOverviewLessonProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseOverviewLessonProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOverviewLessonProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
