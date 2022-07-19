import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgressCompletedComponent } from './course-progress-completed.component';

describe('CourseProgressCompletedComponent', () => {
  let component: CourseProgressCompletedComponent;
  let fixture: ComponentFixture<CourseProgressCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProgressCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProgressCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
