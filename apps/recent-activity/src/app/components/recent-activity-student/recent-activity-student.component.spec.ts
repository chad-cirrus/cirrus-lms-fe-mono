import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityStudentComponent } from './recent-activity-student.component';
import { RecentActivityService } from '../../services/recent-activity.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SidenavHeaderService } from '@cirrus/sidenav-header';
import { of } from 'rxjs';
import { IRecentActivityNotifications } from '../../models/IRecentActivityNotifications';
import { Achievements, IRecentActivity, OverallProgress } from '../../models/IRecentActivity';
import { MockComponent } from 'ng-mocks';
import { OverallProgressComponent } from '../overall-progress/overall-progress.component';
import { NotificationsSectionComponent } from '../notifications/notifications-section.component';
import { AchievementsComponent } from '../achievements/achievements.component';
import { TotalFlightHoursComponent } from '../total-flight-hours/total-flight-hours.component';
import { CoursesInProgressComponent } from '../courses-in-progress/courses-in-progress.component';

jest.mock('swiper', () => ({
  Swiper: { use() {} },
  Navigation: () => null,
  Pagination: () => null,
}));

describe('RecentActivityComponent', () => {
  let component: RecentActivityStudentComponent;
  let fixture: ComponentFixture<RecentActivityStudentComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecentActivityStudentComponent,
        MockComponent(OverallProgressComponent),
        MockComponent(NotificationsSectionComponent),
        MockComponent(AchievementsComponent),
        MockComponent(TotalFlightHoursComponent),
        MockComponent(CoursesInProgressComponent),
      ],
      providers: [
        provideMockStore(),
        { provide: RecentActivityService, useClass: MockRecentActivityService },
        { provide: SidenavHeaderService, useClass: SidenavHeaderService },
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockRecentActivityService {
  nullOverallProgress: OverallProgress = { course_work_stats: [], flight_hours: [], iacra_stats: [], logbook_stats: [] };
  nullAchievements: Achievements = { badges: [], certificates: [] };
  nullRecentActivity: IRecentActivity = { achievements: this.nullAchievements, courses: [], overall_progress: this.nullOverallProgress };
  nullRecentActivityNotifications: IRecentActivityNotifications = {
    notifications: [],
    recentActivity: this.nullRecentActivity
  };
  recentActivityNotifications$ = of(this.nullRecentActivityNotifications);

  getRecentActivityAndNotifications(): void {}
}
