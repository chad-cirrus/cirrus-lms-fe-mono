import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollmentsRouteComponent } from './course-enrollments-route.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CoursesTabEnrollmentHistoryComponent } from '@cirrus/ui';
import { MockComponent } from 'ng-mocks';

describe('CourseEnrollmentsRouteComponent', () => {
  let component: CourseEnrollmentsRouteComponent;
  let fixture: ComponentFixture<CourseEnrollmentsRouteComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseEnrollmentsRouteComponent, MockComponent(CoursesTabEnrollmentHistoryComponent)],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
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
