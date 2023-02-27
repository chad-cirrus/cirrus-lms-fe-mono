import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTaskPerformanceComponent } from './student-task-performance.component';

describe('StudentTaskPerformanceComponent', () => {
  let component: StudentTaskPerformanceComponent;
  let fixture: ComponentFixture<StudentTaskPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTaskPerformanceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTaskPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
