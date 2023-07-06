import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CirrusMaterialModule } from './cirrus-material.module';
import { LessonLandingPageComponent } from './lesson-landing-page/lesson-landing-page.component';
import { LessonContentItemComponent } from './lesson-content-item/lesson-content-item.component';
import { ProgressCardComponent } from './progress-card/progress-card.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { InstructorBarComponent } from './instructor-bar/instructor-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonProgressComponent } from './lesson-progress/lesson-progress.component';
import { LessonContentsComponent } from './lesson-contents/lesson-contents.component';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuSliderComponent } from './menu-slider/menu-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StagesOverlayComponent } from './stages-overlay/stages-overlay.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LessonContentPlayerMenuComponent } from './lesson-content-player-menu/lesson-content-player-menu.component';

import { VideoPlayerComponent } from './video-player/video-player.component';
import { PlaceholderDirective } from './helpers/Placeholder.directive';
import { ContentImageComponent } from './content-image/content-image.component';
import { ContentRichTextComponent } from './content-rich-text/content-rich-text.component';
import { CirrusSanitizerService } from './shared/cirrus-sanitizer.service';
import { AssessmentComponent } from './assessment/assessment.component';

import { MatTabsModule } from '@angular/material/tabs';
import { TaskComponent } from './task/task.component';
import { CompletionStandardsComponent } from './completion-standards/completion-standards.component';

import { InteractiveComponent } from './interactive/interactive.component';
import { AttemptsComponent } from './attempts/attempts.component';
import { AttemptFeedbackComponent } from './attempt-feedback/attempt-feedback.component';
import { LogbookComponent } from './logbook/logbook.component';
import { NotificationComponent } from './testdialog/notification.component';
import { ButtonComponent } from './testdialog/button.component';
import { CompletionDialogComponent } from './completion-dialog/completion-dialog.component';
import { CourseCompletionComponent } from './course-completion/course-completion.component';
import { LessonProgressStatsComponent } from './lesson-progress-stats/lesson-progress-stats.component';
import { PdfComponent } from './pdf/pdf.component';
import { EncodeUriPipe } from './encode-uri.pipe';
import { UiDownloadService } from './course-completion/ui-download.service';
import { CourseProgressComponent } from './course-progress/course-progress.component';
import { CourseProgressCompletedComponent } from './course-progress-completed/course-progress-completed.component';
import { CourseLandingPageComponent } from './course-landing-page/course-landing-page.component';
import { CoursePlayerComponent } from './course-player/course-player.component';
import { CtaButtonComponent } from './cta-button/cta-button.component';
import { CourseLessonsComponent } from './course-lessons/course-lessons.component';
import { CourseLessonItemComponent } from './course-lesson-item/course-lesson-item.component';
import { CourseLessonContentCountComponent } from './course-lesson-content-count/course-lesson-content-count.component';
import { CoursesTabEnrollmentHistoryComponent } from './courses-tab-enrollment-history/courses-tab-enrollment-history.component';
import { CourseOverviewLessonProgressBarComponent } from './course-overview-lesson-progress-bar/course-overview-lesson-progress-bar.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CourseSummaryCountsComponent } from './course-summary-counts/course-summary-counts.component';
import { CourseContentProgressCircleComponent } from './course-content-progress-circle/course-content-progress-circle.component';
import { HoursAndLandingsComponent } from './hours-and-landings/hours-and-landings.component';
import { GenericResponsiveMatTableComponent } from './generic-responsive-mat-table/generic-responsive-mat-table.component';
import { TableFormatPipe } from './table-format.pipe';
import { LessonTypePipe } from './helpers/LessonTypePipe';
import { FilterComponent } from './filter/filter.component';
import { FormatFilterPipe } from './format-filter.pipe';

import { HoursLandingTypeToTextPipe } from './helpers/HoursLandingTypeToText.pipe';
import { HoursLandingTypeToIconPipe } from './helpers/HoursLandingTypeToIcon.pipe';
import { BluePopUpComponent } from './blue-pop-up/blue-pop-up.component';
import { SearchInputModule } from '@cirrus/search-input';
import { CoursePreviewVideoPlayerComponent } from './course-preview-video-player/course-preview-video-player.component';
import { ConvertToSpacesPipe } from './course-landing-page/pipes/convert-to-spaces.pipe';

@NgModule({
  imports: [
    CommonModule,
    CirrusMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    OverlayModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    MatSidenavModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    SearchInputModule,
  ],
  declarations: [
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
    ProgressIndicatorComponent,
    InstructorBarComponent,
    LessonProgressComponent,
    LessonContentsComponent,
    HeaderDropdownComponent,
    MenuSliderComponent,
    EditProfileComponent,
    StagesOverlayComponent,
    LessonContentPlayerMenuComponent,
    VideoPlayerComponent,
    PlaceholderDirective,
    ContentImageComponent,
    ContentRichTextComponent,
    AssessmentComponent,
    TaskComponent,
    CompletionStandardsComponent,
    InteractiveComponent,
    TaskComponent,
    CompletionStandardsComponent,
    AttemptsComponent,
    AttemptFeedbackComponent,
    LogbookComponent,
    NotificationComponent,
    ButtonComponent,
    CompletionDialogComponent,
    CourseCompletionComponent,
    LessonProgressStatsComponent,
    PdfComponent,
    EncodeUriPipe,
    CourseProgressComponent,
    CourseProgressCompletedComponent,
    CourseLandingPageComponent,
    CoursePlayerComponent,
    CtaButtonComponent,
    CourseLessonsComponent,
    CourseLessonItemComponent,
    CourseLessonContentCountComponent,
    CoursesTabEnrollmentHistoryComponent,
    CourseOverviewComponent,
    CourseSummaryCountsComponent,
    CourseContentProgressCircleComponent,
    CourseOverviewLessonProgressBarComponent,
    HoursAndLandingsComponent,
    GenericResponsiveMatTableComponent,
    TableFormatPipe,
    ConvertToSpacesPipe,
    LessonTypePipe,
    HoursLandingTypeToTextPipe,
    HoursLandingTypeToIconPipe,
    FilterComponent,
    FormatFilterPipe,
    BluePopUpComponent,
    CoursePreviewVideoPlayerComponent
  ],
  exports: [
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
    ProgressIndicatorComponent,
    InstructorBarComponent,
    LessonProgressComponent,
    LessonContentsComponent,
    HeaderDropdownComponent,
    MenuSliderComponent,
    EditProfileComponent,
    CdkAccordionModule,
    LessonContentPlayerMenuComponent,
    StagesOverlayComponent,
    VideoPlayerComponent,
    ContentImageComponent,
    ContentRichTextComponent,
    AssessmentComponent,
    TaskComponent,
    CompletionStandardsComponent,
    InteractiveComponent,
    AttemptsComponent,
    AttemptFeedbackComponent,
    LogbookComponent,
    NotificationComponent,
    ButtonComponent,
    CompletionDialogComponent,
    CourseCompletionComponent,
    LessonProgressStatsComponent,
    PdfComponent,
    EncodeUriPipe,
    CourseProgressComponent,
    CourseProgressCompletedComponent,
    CourseLandingPageComponent,
    CoursePlayerComponent,
    CtaButtonComponent,
    CourseLessonsComponent,
    CourseLessonItemComponent,
    CourseLessonContentCountComponent,
    CoursesTabEnrollmentHistoryComponent,
    CourseOverviewComponent,
    CourseSummaryCountsComponent,
    CourseContentProgressCircleComponent,
    CourseOverviewLessonProgressBarComponent,
    GenericResponsiveMatTableComponent,
    TableFormatPipe,
    ConvertToSpacesPipe,
    LessonTypePipe,
    HoursLandingTypeToTextPipe,
    HoursLandingTypeToIconPipe,
    FilterComponent,
    FormatFilterPipe,
    BluePopUpComponent,
    CoursePreviewVideoPlayerComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    CirrusSanitizerService,
    UiDownloadService,
  ],
})
export class UiModule {}
