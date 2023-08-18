import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UiCourseService } from 'libs/ui/src/lib/ui-course.service';
import { CourseEnrollmentComponent } from './course-enrollment.component';

class MockUICourseService {}

describe('CourseEnrollmentComponent', () => {
  let component: CourseEnrollmentComponent;
  let fixture: ComponentFixture<CourseEnrollmentComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [CourseEnrollmentComponent],
      providers: [provideMockStore(), { provide: UiCourseService, useClass: MockUICourseService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
