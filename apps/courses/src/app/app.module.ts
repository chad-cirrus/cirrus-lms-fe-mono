import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  CirrusMaterialModule,
  ErrorNotificationModule,
  MatIconRegistryModule,
  NotificationService,
  UiModule,
  UserService,
} from '@cirrus/ui';

import { NotificationsMenuModule } from '@cirrus/notification-menu';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { extModules } from './build-specifics';
import { EffectsModule } from '@ngrx/effects';
import { CourseComponent } from './course/course.component';
import { AppRoutingModule } from './app-routing.module';
import { coursesReducers } from './store/reducers';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/AuthHttpInterceptor';
import { LessonsEffects } from './store/effects/lessons.effects';
import { LessonComponent } from './course/lesson/lesson.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScormContentDialogComponent } from './dialog-service/scorm-content-dialog/scorm-content-dialog.component';
import { MediaServerService } from './media.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { NoopComponent } from './shared/noop/noop.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { ContentPlayerModule } from './content-player/content-player.module';
import { ProgressEffects } from './store/effects/progress.effects';
import { environment } from '../environments/environment';
import { FullScreenImageDialogComponent } from './full-screen-image-dialog/full-screen-image-dialog.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { CourseOverviewRouteComponent } from './course/course-overview-route/course-overview-route.component';
import { CourseLessonsRouteComponent } from './course/course-lessons-route/course-lessons-route.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CourseEnrollmentsRouteComponent } from './course/course-enrollments-route/course-enrollments-route.component';
import {
  SidenavHeaderModule,
  SidenavHeaderService,
} from '@cirrus/sidenav-header';
import { MatRippleModule } from '@angular/material/core';
import { NextLessonRedirectComponent } from './next-lesson-redirect/next-lesson-redirect.component';
import { OrderEffects } from './store/effects/order.effects';
import { CourseEnrollmentComponent } from './course-enrollment/course-enrollment.component';

@NgModule({ declarations: [
        AppComponent,
        CourseComponent,
        LessonComponent,
        ScormContentDialogComponent,
        NoopComponent,
        CourseOverviewRouteComponent,
        CourseLessonsRouteComponent,
        CourseEnrollmentsRouteComponent,
        NextLessonRedirectComponent,
        CourseEnrollmentComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        CirrusMaterialModule,
        UiModule,
        StoreModule.forRoot(coursesReducers),
        extModules,
        EffectsModule.forRoot([LessonsEffects, ProgressEffects, OrderEffects]),
        AppRoutingModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatDialogModule,
        ReactiveFormsModule,
        CommonModule,
        MatBadgeModule,
        OverlayModule,
        A11yModule,
        ContentPlayerModule,
        FullScreenImageDialogComponent,
        MatIconRegistryModule,
        MatTabsModule,
        ErrorNotificationModule,
        NotificationsMenuModule,
        SidenavHeaderModule,
        MatRippleModule], providers: [
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
        NotificationService,
        UserService,
        SidenavHeaderService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
