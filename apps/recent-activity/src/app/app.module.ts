import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { RecentActivityStudentComponent } from './components/recent-activity-student/recent-activity-student.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/AuthHttpInterceptor';
import {
  CirrusMaterialModule,
  ErrorNotificationModule,
  NotificationService,
  UiDownloadService,
  UserService,
} from '@cirrus/ui';

import { NotificationsMenuModule } from '@cirrus/notification-menu';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CoursesInProgressComponent } from './components/courses-in-progress/courses-in-progress.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { OverallProgressComponent } from './components/overall-progress/overall-progress.component';
import { CertificatesComponent } from './components/achievements/certificates/certificates.component';
import { BadgesComponent } from './components/achievements/badges/badges.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogbookComponent } from './components/overall-progress/logbook/logbook.component';
import { CourseworkComponent } from './components/overall-progress/coursework/coursework.component';
import { IACRAComponent } from './components/overall-progress/iacra/iacra.component';
import { NotificationsSectionComponent } from './components/notifications/notifications-section.component';
import { MatBadgeModule } from '@angular/material/badge';
import { StoreModule } from '@ngrx/store';
import { recentActivityReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { A11yModule } from '@angular/cdk/a11y';
import { TotalFlightHoursComponent } from './components/total-flight-hours/total-flight-hours.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { CirrusChartComponent } from './components/chart/chart.component';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NoopComponent } from './components/noop/noop.component';
import { CourseInProgressValuePipe } from './components/courses-in-progress/course-in-progress-value.pipe';
import { SwiperModule } from 'swiper/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AchievementsPageComponent } from './components/achievements-page/achievements-page.component';
import { CertificatesFullComponent } from './components/achievements-page/certificates-full/certificates-full.component';
import { BadgesFullComponent } from './components/achievements-page/badges-full/badges-full.component';
import { FormatLogbookTypePipe } from './components/overall-progress/logbook/format-logbook-type.pipe';
import { FormatCourseworkTypePipe } from './components/overall-progress/coursework/format-coursework-type.pipe';
import { FormatIacraTypePipe } from './components/overall-progress/iacra/format-iacra-type.pipe';
import { ImageFormatterPipe } from './image-formatter.pipe';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import {
  SidenavHeaderModule,
  SidenavHeaderService,
} from '@cirrus/sidenav-header';
import { ClickOutsideDirective } from './directives/clickoutside.directive';

import { SearchInputModule } from '@cirrus/search-input';
import { BadgeModule } from '@cirrus/badge';
import { RecentActivityInstructorComponent } from './components/recent-activity-instructor/recent-activity-instructor.component';
import { TotalFlightHoursInstructorComponent } from './components/recent-activity/total-flight-hours-instructor/total-flight-hours-instructor.component';
import { ToggleInstructorStudentComponent } from './components/toggle-instructor-student/toggle-instructor-student.component';
import { StudentTaskPerformanceComponent } from './components/student-task-performance/student-task-performance.component';

@NgModule({
  declarations: [
    AppComponent,
    RecentActivityComponent,
    RecentActivityStudentComponent,
    CoursesInProgressComponent,
    AchievementsComponent,
    OverallProgressComponent,
    CertificatesComponent,
    BadgesComponent,
    LogbookComponent,
    CourseworkComponent,
    IACRAComponent,
    NotificationsSectionComponent,
    TotalFlightHoursComponent,
    CirrusChartComponent,
    NoopComponent,
    CourseInProgressValuePipe,
    AchievementsPageComponent,
    CertificatesFullComponent,
    BadgesFullComponent,
    FormatLogbookTypePipe,
    FormatCourseworkTypePipe,
    FormatIacraTypePipe,
    ImageFormatterPipe,
    RecentActivityInstructorComponent,
    TotalFlightHoursInstructorComponent,
    ClickOutsideDirective,
    ToggleInstructorStudentComponent,
    StudentTaskPerformanceComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CirrusMaterialModule,
    FlexLayoutModule,
    MatBadgeModule,
    StoreModule.forRoot(recentActivityReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    OverlayModule,
    AppRoutingModule,
    CdkAccordionModule,
    MatTabsModule,
    A11yModule,
    NgApexchartsModule,
    ErrorNotificationModule,
    MatSidenavModule,
    SwiperModule,
    NotificationsMenuModule,
    SwiperModule,
    ReactiveFormsModule,
    SidenavHeaderModule,
    SearchInputModule,
    BadgeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: 'environment',
      useValue: environment,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    UiDownloadService,
    SidenavHeaderService,
    UserService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
  exports: [
    RecentActivityComponent,
    RecentActivityStudentComponent,
    CoursesInProgressComponent,
    AchievementsComponent,
    OverallProgressComponent,
    CertificatesComponent,
    BadgesComponent,
    LogbookComponent,
    CourseworkComponent,
    IACRAComponent,
    NotificationsSectionComponent,
    FormatLogbookTypePipe,
    FormatCourseworkTypePipe,
    FormatIacraTypePipe,
    ImageFormatterPipe,
    TotalFlightHoursInstructorComponent,
    ClickOutsideDirective,
  ],
})
export class AppModule {}
