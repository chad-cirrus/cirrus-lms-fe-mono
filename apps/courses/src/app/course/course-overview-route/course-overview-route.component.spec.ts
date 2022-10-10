import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOverviewRouteComponent } from './course-overview-route.component';

describe('CourseOverviewRouteComponentComponent', () => {
  let component: CourseOverviewRouteComponent;
  let fixture: ComponentFixture<CourseOverviewRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseOverviewRouteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOverviewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
