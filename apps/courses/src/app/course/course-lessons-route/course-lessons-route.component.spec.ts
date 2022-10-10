import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonsRouteComponent } from './course-lessons-route.component';

describe('CourseLessonsRouteComponent', () => {
  let component: CourseLessonsRouteComponent;
  let fixture: ComponentFixture<CourseLessonsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseLessonsRouteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLessonsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
