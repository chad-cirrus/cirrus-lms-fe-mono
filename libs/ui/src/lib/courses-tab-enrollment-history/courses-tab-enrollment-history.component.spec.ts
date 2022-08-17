import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTabEnrollmentHistoryComponent } from './courses-tab-enrollment-history.component';

describe('CoursesTabEnrollmentHistoryComponent', () => {
  let component: CoursesTabEnrollmentHistoryComponent;
  let fixture: ComponentFixture<CoursesTabEnrollmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesTabEnrollmentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesTabEnrollmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
