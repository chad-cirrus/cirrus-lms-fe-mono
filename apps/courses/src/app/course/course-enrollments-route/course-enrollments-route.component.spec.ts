import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollmentsRouteComponent } from './course-enrollments-route.component';

describe('CourseEnrollmentsRouteComponent', () => {
  let component: CourseEnrollmentsRouteComponent;
  let fixture: ComponentFixture<CourseEnrollmentsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEnrollmentsRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnrollmentsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
