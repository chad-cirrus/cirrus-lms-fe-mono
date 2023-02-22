import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalFlightHoursInstructorComponent } from './total-flight-hours-instructor.component';

describe('TotalFlightHoursInstructorComponent', () => {
  let component: TotalFlightHoursInstructorComponent;
  let fixture: ComponentFixture<TotalFlightHoursInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalFlightHoursInstructorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalFlightHoursInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
