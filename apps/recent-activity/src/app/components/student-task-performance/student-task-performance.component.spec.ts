import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTaskPerformanceComponent } from './student-task-performance.component';
import { RecentActivityService } from '../../services/recent-activity.service';
import { of } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

describe('StudentTaskPerformanceComponent', () => {
  let component: StudentTaskPerformanceComponent;
  let fixture: ComponentFixture<StudentTaskPerformanceComponent>;
  let mockRecentActivityService = {
    getStudentTaskPerformance: jest.fn().mockReturnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTabsModule, NoopAnimationsModule, MatSelectModule],
      declarations: [StudentTaskPerformanceComponent],
      providers: [
        { provide: RecentActivityService, useValue: mockRecentActivityService },
      ],
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
