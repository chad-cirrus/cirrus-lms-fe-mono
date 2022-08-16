import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentProgressCircleComponent } from './course-content-progress-circle.component';

describe('CourseContentProgressCircleComponent', () => {
  let component: CourseContentProgressCircleComponent;
  let fixture: ComponentFixture<CourseContentProgressCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseContentProgressCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseContentProgressCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
