import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleInstructorStudentComponent } from './toggle-instructor-student.component';

describe('ToggleInstructorStudentComponent', () => {
  let component: ToggleInstructorStudentComponent;
  let fixture: ComponentFixture<ToggleInstructorStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleInstructorStudentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleInstructorStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
