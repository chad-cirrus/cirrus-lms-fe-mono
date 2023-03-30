import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RecentActivityComponent } from './recent-activity.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RecentActivityService } from '../../services/recent-activity.service';
import { BehaviorSubject, of } from 'rxjs';
import { initialRecentActivity, IRecentActivity, OverallProgress } from '../../models/IRecentActivity';
import { IRecentActivityNotifications } from '../../models/IRecentActivityNotifications';
import { ICirrusUser } from '@cirrus/models';
import { MockComponent } from 'ng-mocks';
import { RecentActivityStudentComponent } from '../recent-activity-student/recent-activity-student.component';
import { RecentActivityFacade } from '../../recent-activity-facade.service';

describe('RecentActivityComponent', () => {
  let component: RecentActivityComponent;
  let fixture: ComponentFixture<RecentActivityComponent>;
  let store: MockStore;
  let cirrusUser: ICirrusUser = {
    authentication_token: '',
    ctc_admin: false,
    deactivated: false,
    email: '',
    firstname: '',
    full_sfid: '',
    id: 0,
    lastname: '',
    name: '',
    role: '',
    salesforce_id: '',
    sf_lms_role: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecentActivityComponent,
        MockComponent(RecentActivityStudentComponent),
      ],
      providers: [
        provideMockStore(),
        { provide: RecentActivityService, useClass: MockRecentActivityService },
        { provide: RecentActivityFacade, useClass: MockRecentActivityFacade },
      ]
    }).compileComponents();

    localStorage.setItem('cirrus-user', JSON.stringify(cirrusUser));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('flightHoursStringStudent$', () => {
    it('is the student_flight_hours value in recent activity, rounded down', fakeAsync(() => {
      let actual: number | null = null;
      component.flightHoursStringStudent$.subscribe(hours => {
        actual = hours;
      });
      tick();
      expect(actual).toEqual(7);
    }));
  });

  describe('flightHoursStringInstructor$', () => {
    it('is the instructor_flight_hours value in recent activity, rounded down', fakeAsync(() => {
      let actual: number | null = null;
      component.flightHoursStringInstructor$.subscribe(hours => {
        actual = hours;
      });
      tick();
      expect(actual).toEqual(3);
    }));
  });
});

class MockRecentActivityService {

  overall_progress: OverallProgress = Object.assign({}, initialRecentActivity.overall_progress, {
    flight_hours: [
      { type: 'student_flight_hours', completed: 7.1 },
      { type: 'instructor_flight_hours', completed: 3.6 },
    ],
  });

  recentActivity: IRecentActivity =
    Object.assign({}, initialRecentActivity, { overall_progress: this.overall_progress });

  initialValue: IRecentActivityNotifications = {
    recentActivity: this.recentActivity,
    notifications: [],
  };
  recentActivityNotifications$ = of(this.initialValue);
}
class MockRecentActivityFacade {
  isFeatureFlagEnabled() {
    return new BehaviorSubject<boolean>(false).asObservable();
  }
}
