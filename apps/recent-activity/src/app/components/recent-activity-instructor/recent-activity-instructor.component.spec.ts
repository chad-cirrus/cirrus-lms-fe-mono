import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityInstructorComponent } from './recent-activity-instructor.component';
import { RecentActivityService } from '../../services/recent-activity.service';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { of } from 'rxjs';
import {
  IRecentActivityInstructors,
  IRecentActivityInstructorsNotifications,
} from '../../models/IRecentActivityInstructors';
import { MockComponent } from 'ng-mocks';
import { ToggleInstructorStudentComponent } from '../toggle-instructor-student/toggle-instructor-student.component';
import { TotalFlightHoursInstructorComponent } from '../recent-activity/total-flight-hours-instructor/total-flight-hours-instructor.component';
import { RecentStudentsComponent } from '../recent-students/recent-students.component';
import { NotificationsSectionComponent } from '../notifications/notifications-section.component';
import { StudentTaskPerformanceComponent } from '../student-task-performance/student-task-performance.component';
import { FlightInstructionHoursComponent } from '../flight-instruction-hours/flight-instruction-hours.component';

jest.mock('swiper', () => ({
  Swiper: { use() {} },
  Navigation: () => null,
  Pagination: () => null,
}));

describe('RecentActivityInstructorComponent', () => {
  let component: RecentActivityInstructorComponent;
  let fixture: ComponentFixture<RecentActivityInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecentActivityInstructorComponent,
        MockComponent(ToggleInstructorStudentComponent),
        MockComponent(TotalFlightHoursInstructorComponent),
        MockComponent(RecentStudentsComponent),
        MockComponent(NotificationsSectionComponent),
        MockComponent(StudentTaskPerformanceComponent),
        MockComponent(FlightInstructionHoursComponent),
      ],
      providers: [
        { provide: RecentActivityService, useClass: MockRecentActivityService },
        { provide: SidenavHeaderService, useClass: SidenavHeaderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRecentActivityService {
  private nullRecentActivity: IRecentActivityInstructors = {
    recent_student_achievements: [],
    flight_instruction_hours: [],
    instructor_students: { recent_students: [], students: [] },
    overall_progress: { flight_hours: [], instructor_flight_log_stats: [] },
    student_task_performance: { top_missed_tasks: [], top_passed_tasks: [] },
  };
  private nullNotifications: IRecentActivityInstructorsNotifications = {
    notifications: [],
    recentActivity: this.nullRecentActivity,
  };
  recentActivityNotificationsInstructors$ = of(this.nullNotifications);

  getRecentActivityAndNotificationsInstructor(): void {}
}
