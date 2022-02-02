import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CirrusMaterialModule, UiModule } from '@cirrus/ui';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { extModules } from './build-specifics';
import { EffectsModule } from '@ngrx/effects';
import { CourseComponent } from './course/course.component';
import { AppRoutingModule } from './app-routing.module';
import { coursesReducers } from './store/reducers';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/AuthHttpInterceptor';
import { LessonsEffects } from './store/effects/lessons.effects';
import { MediaContentDialogComponent } from './dialog-service/media-content-dialog/media-content-dialog.component';
import { WorkbookRoutesEffects } from './store/effects/workbook-routes.effects';
import { LessonComponent } from './course/lesson/lesson.component';
import {
  MatDialogConfig,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { CoursesDialogService } from './dialog-service/cirrus-dialog.service';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ScormContentDialogComponent } from './dialog-service/scorm-content-dialog/scorm-content-dialog.component';
import { ContentPlayerComponent } from './dialog-service/content-player/content-player.component';
import { MediaServerService } from './media.service';
import { ScormComponent } from './dialog-service/content-player/scorm/scorm.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    MediaContentDialogComponent,
    LessonComponent,
    TopNavbarComponent,
    ScormContentDialogComponent,
    ContentPlayerComponent,
    ScormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CirrusMaterialModule,
    UiModule,
    StoreModule.forRoot(coursesReducers),
    extModules,
    EffectsModule.forRoot([LessonsEffects, WorkbookRoutesEffects]),
    AppRoutingModule,
    FlexLayoutModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    CoursesDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        width: '66vw',
        closeOnNavigation: true,
        panelClass: 'cirrus-media-player',
        disableClose: true,
        maxHeight: '66vw',
      } as MatDialogConfig,
    },
    MediaServerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
