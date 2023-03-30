import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RecentActivityService } from './services/recent-activity.service';
import { RecentActivityFacade } from './recent-activity-facade.service';
import { NotificationService, UserService } from '@cirrus/ui';
import { GlobalFooterComponent, SidenavHeaderService } from '@cirrus/sidenav-header';
import { of } from 'rxjs';
import { IContact, IOrder, IOrderUser } from '@cirrus/models';
import { Achievements, IRecentActivity, OverallProgress } from './models/IRecentActivity';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalHeaderComponent } from '../../../../libs/sidenav-header/src/lib/global-header/global-header.component';
import { MockComponent } from 'ng-mocks';
import { NotificationsMenuComponent } from '../../../../libs/notification-menu/src/lib/notifications-menu.component';

describe('AppComponent', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSidenavModule, NoopAnimationsModule],
      declarations: [
        AppComponent,
        MockComponent(GlobalHeaderComponent),
        MockComponent(GlobalFooterComponent),
        MockComponent(NotificationsMenuComponent),
      ],
      providers:[
        provideMockStore(),
        { provide: RecentActivityService, useClass: MockRecentActivityService },
        { provide: RecentActivityFacade, useClass: MockRecentActivityFacade },
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: SidenavHeaderService, useClass: SidenavHeaderService },
        { provide: UserService, useClass: MockUserService },
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

class MockRecentActivityService {
  nullOverallProgress: OverallProgress = { course_work_stats: [], flight_hours: [], iacra_stats: [], logbook_stats: [] };
  nullAchievements: Achievements = { badges: [], certificates: [] };
  nullRecentActivity: IRecentActivity = { achievements: this.nullAchievements, courses: [], overall_progress: this.nullOverallProgress }
  recentActivityNotifications$ = of({
    notifications: [],
    recentActivity: this.nullRecentActivity
  });
}
class MockRecentActivityFacade {}
class MockNotificationService {
  getNotificationsCount() { return of(0); }
}
class MockUserService {
  nullContact: IContact = { firstname: '', id: 0, lastname: '', name: '' };
  nullOrderUser: IOrderUser = {
    admin: false,
    contact: this.nullContact,
    ctc_admin: false,
    deactivated: false,
    email: '',
    id: 0,
    role: '',
    salesforce_id: ''
  };
  nullOrder: IOrder = {
    created_at: new Date(),
    id: 0,
    order_line_items: [],
    order_status: '',
    payments: [],
    user: this.nullOrderUser,
    user_id: 0
  };
  getMyOrders() { return of(this.nullOrder); }
}
