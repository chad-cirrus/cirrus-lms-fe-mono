import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/AuthHttpInterceptor';
import {
  CirrusMaterialModule,
  ErrorNotificationModule,
  NotificationsMenuModule,
  UiDownloadService,
} from '@cirrus/ui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoursesInProgressComponent } from './components/courses-in-progress/courses-in-progress.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { OverallProgressComponent } from './components/overall-progress/overall-progress.component';
import { FlightHoursChartComponent } from './components/flight-hours-chart/flight-hours-chart.component';
import { CertificatesComponent } from './components/achievements/certificates/certificates.component';
import { BadgesComponent } from './components/achievements/badges/badges.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogbookComponent } from './components/overall-progress/logbook/logbook.component';
import { CourseworkComponent } from './components/overall-progress/coursework/coursework.component';
import { IACRAComponent } from './components/overall-progress/iacra/iacra.component';
import { NotificationsSectionComponent } from './components/notifications/notifications-section.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatBadgeModule } from '@angular/material/badge';
import { StoreModule } from '@ngrx/store';
import { recentActivityReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './components/header/header.component';
import { UserMenusComponent } from './components/header/user-menus/user-menus.component';
import { MenuSliderComponent } from './components/menu-slider/menu-slider.component';
import { HeaderDropdownComponent } from './components/header-dropdown/header-dropdown.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HamburgerMenuComponent } from './components/header/hamburger-menu/hamburger-menu.component';
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
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RecentActivityComponent,
    CoursesInProgressComponent,
    AchievementsComponent,
    OverallProgressComponent,
    FlightHoursChartComponent,
    CertificatesComponent,
    BadgesComponent,
    LogbookComponent,
    CourseworkComponent,
    IACRAComponent,
    NotificationsSectionComponent,
    SideNavComponent,
    HeaderComponent,
    UserMenusComponent,
    MenuSliderComponent,
    HeaderDropdownComponent,
    HamburgerMenuComponent,
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
    ReactiveFormsModule,
    NotificationsMenuModule,
    SwiperModule,
    ReactiveFormsModule,
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
  ],
  bootstrap: [AppComponent],
  exports: [
    RecentActivityComponent,
    CoursesInProgressComponent,
    AchievementsComponent,
    OverallProgressComponent,
    FlightHoursChartComponent,
    CertificatesComponent,
    BadgesComponent,
    LogbookComponent,
    CourseworkComponent,
    IACRAComponent,
    NotificationsSectionComponent,
    FormatLogbookTypePipe,
    FormatCourseworkTypePipe,
    FormatIacraTypePipe,
  ],
})
export class AppModule {}
