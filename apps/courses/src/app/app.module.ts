import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  CirrusMaterialModule,
  ErrorNotificationModule,
  MatIconRegistryModule,
  NotificationsMenuModule,
  UiModule,
} from '@cirrus/ui';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { extModules } from './build-specifics';
import { EffectsModule } from '@ngrx/effects';
import { CourseComponent } from './course/course.component';
import { AppRoutingModule } from './app-routing.module';
import { coursesReducers } from './store/reducers';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/AuthHttpInterceptor';
import { LessonsEffects } from './store/effects/lessons.effects';
import { LessonComponent } from './course/lesson/lesson.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ScormContentDialogComponent } from './dialog-service/scorm-content-dialog/scorm-content-dialog.component';
import { MediaServerService } from './media.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './course/side-nav/side-nav.component';
import { HeaderComponent } from './course/header/header.component';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { NoopComponent } from './shared/noop/noop.component';
import { UserMenusComponent } from './course/header/user-menus/user-menus.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { HamburgerMenuComponent } from './course/header/hamburger-menu/hamburger-menu.component';
import { ContentPlayerModule } from './content-player/content-player.module';
import { ProgressEffects } from './store/effects/progress.effects';
import { environment } from '../environments/environment';

import { HttpErrorInterceptor } from './interceptors/httperror.interceptor';

import { CourseOverviewRouteComponent } from './course/course-overview-route/course-overview-route.component';
import { CourseLessonsRouteComponent } from './course/course-lessons-route/course-lessons-route.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CourseEnrollmentsRouteComponent } from './course/course-enrollments-route/course-enrollments-route.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    LessonComponent,
    TopNavbarComponent,
    ScormContentDialogComponent,
    SideNavComponent,
    HeaderComponent,
    NoopComponent,
    UserMenusComponent,
    HamburgerMenuComponent,
    CourseOverviewRouteComponent,
    CourseLessonsRouteComponent,
    CourseEnrollmentsRouteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CirrusMaterialModule,
    UiModule,
    StoreModule.forRoot(coursesReducers),
    extModules,
    EffectsModule.forRoot([LessonsEffects, ProgressEffects]),
    AppRoutingModule,
    FlexLayoutModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatBadgeModule,
    OverlayModule,
    A11yModule,
    ContentPlayerModule,
    MatIconRegistryModule,
    MatTabsModule,
    ErrorNotificationModule,
    NotificationsMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    MediaServerService,
    {
      provide: 'environment',
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
  exports: [HamburgerMenuComponent],
})
export class AppModule {}
