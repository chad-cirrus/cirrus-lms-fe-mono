import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CirrusMaterialModule,
  ConnectionsService,
  NotificationService,
  UiDownloadService,
  UserService,
} from '@cirrus/ui';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesService } from './course/course.service';
import { CoursesFacadeService } from './courses-facade.service';
import {
  GlobalFooterComponent,
  SidenavHeaderService,
} from '@cirrus/sidenav-header';
import { of } from 'rxjs';
import { IContact, IOrder, IOrderUser } from '@cirrus/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { HttpClientModule } from '@angular/common/http';
import { GlobalHeaderComponent } from '@cirrus/sidenav-header';
import { NotificationsMenuComponent } from '@cirrus/notification-menu';

class MockCoursesFacadeService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fullstoryInit() {}
}

class MockCoursesService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getNotifications() {}
}

describe('AppComponent', () => {
  beforeEach(async () => {
    let store: MockStore;

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}, {}),
        CirrusMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [
        AppComponent,
        MockComponent(GlobalHeaderComponent),
        MockComponent(GlobalFooterComponent),
        MockComponent(NotificationsMenuComponent),
      ],
      providers: [
        provideMockStore(),
        { provide: CoursesService, useClass: MockCoursesService },
        { provide: ConnectionsService, useValue: {} },
        { provide: UiDownloadService, useValue: {} },
        { provide: CoursesFacadeService, useClass: MockCoursesFacadeService },
        { provide: UserService, useClass: MockUserService },
        { provide: SidenavHeaderService, useClass: MockSidenavHeaderService },
        { provide: NotificationService, useClass: MockNotificationService },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();

    expect(app).toBeTruthy();
  });
});

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
    salesforce_id: '',
  };
  nullOrder: IOrder = {
    created_at: new Date(),
    id: 0,
    order_line_items: [],
    order_status: '',
    payments: [],
    user: this.nullOrderUser,
    user_id: 0,
  };
  getMyOrders() {
    return of(this.nullOrder);
  }
}

class MockNotificationService {
  getNotificationsCount() {
    return of(0);
  }
}

class MockSidenavHeaderService {
  showNotifications$ = of(true);
}