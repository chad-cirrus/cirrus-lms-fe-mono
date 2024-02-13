import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CirrusMaterialModule } from './cirrus-material.module';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { InstructorBarComponent } from './instructor-bar/instructor-bar.component';
import { LessonContentItemComponent } from './lesson-content-item/lesson-content-item.component';
import { LessonContentsComponent } from './lesson-contents/lesson-contents.component';
import { LessonLandingPageComponent } from './lesson-landing-page/lesson-landing-page.component';
import { LessonIntroVideoComponent } from './lesson-landing-page/lesson-intro-video/lesson-intro-video.component';
import { LessonProgressComponent } from './lesson-progress/lesson-progress.component';
import { MenuSliderComponent } from './menu-slider/menu-slider.component';
import { ProgressCardComponent } from './progress-card/progress-card.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';

import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StagesOverlayComponent } from './stages-overlay/stages-overlay.component';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LessonContentPlayerMenuComponent } from './lesson-content-player-menu/lesson-content-player-menu.component';

import { AssessmentComponent } from './assessment/assessment.component';
import { ContentImageComponent } from './content-image/content-image.component';
import { ContentRichTextComponent } from './content-rich-text/content-rich-text.component';
import { PlaceholderDirective } from './helpers/Placeholder.directive';
import { CirrusSanitizerService } from './shared/cirrus-sanitizer.service';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { MatTabsModule } from '@angular/material/tabs';
import { CompletionStandardsComponent } from './completion-standards/completion-standards.component';
import { TaskComponent } from './task/task.component';

import { AttemptFeedbackComponent } from './attempt-feedback/attempt-feedback.component';
import { AttemptsComponent } from './attempts/attempts.component';
import { CompletionDialogComponent } from './completion-dialog/completion-dialog.component';
import { CourseCompletionComponent } from './course-completion/course-completion.component';
import { UiDownloadService } from './course-completion/ui-download.service';
import { CourseContentProgressCircleComponent } from './course-content-progress-circle/course-content-progress-circle.component';
import { CourseLandingPageComponent } from './course-landing-page/course-landing-page.component';
import { CourseLessonContentCountComponent } from './course-lesson-content-count/course-lesson-content-count.component';
import { CourseLessonItemComponent } from './course-lesson-item/course-lesson-item.component';
import { CourseLessonsComponent } from './course-lessons/course-lessons.component';
import { CourseOverviewLessonProgressBarComponent } from './course-overview-lesson-progress-bar/course-overview-lesson-progress-bar.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CourseSupportSectionComponent } from './course-overview/course-support-section/course-support-section.component';
import { CoursePlayerComponent } from './course-player/course-player.component';
import { CourseProgressCompletedComponent } from './course-progress-completed/course-progress-completed.component';
import { CourseProgressComponent } from './course-progress/course-progress.component';
import { CourseSummaryCountsComponent } from './course-summary-counts/course-summary-counts.component';
import { CoursesTabEnrollmentHistoryComponent } from './courses-tab-enrollment-history/courses-tab-enrollment-history.component';
import { CtaButtonComponent } from './cta-button/cta-button.component';
import { EncodeUriPipe } from './encode-uri.pipe';
import { FilterComponent } from './filter/filter.component';
import { FormatFilterPipe } from './format-filter.pipe';
import { GenericResponsiveMatTableComponent } from './generic-responsive-mat-table/generic-responsive-mat-table.component';
import { LessonTypePipe } from './helpers/LessonTypePipe';
import { NameToInitialsPipe } from './helpers/NameToInitialsPipe';
import { HoursAndLandingsComponent } from './hours-and-landings/hours-and-landings.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { LessonProgressStatsComponent } from './lesson-progress-stats/lesson-progress-stats.component';
import { LogbookComponent } from './logbook/logbook.component';
import { PdfComponent } from './pdf/pdf.component';
import { TableFormatPipe } from './table-format.pipe';
import { ButtonComponent } from './testdialog/button.component';
import { NotificationComponent } from './testdialog/notification.component';

import { RouterModule } from '@angular/router';
import { SearchInputModule } from '@cirrus/search-input';
import { BluePopUpComponent } from './blue-pop-up/blue-pop-up.component';
import { ConvertToSpacesPipe } from './course-landing-page/pipes/convert-to-spaces.pipe';
import { CoursePreviewVideoPlayerComponent } from './course-preview-video-player/course-preview-video-player.component';
import { HoursLandingTypeToIconPipe } from './helpers/HoursLandingTypeToIcon.pipe';
import { HoursLandingTypeToTextPipe } from './helpers/HoursLandingTypeToText.pipe';
import { FullstoryService } from './lib-services/fullstory/fullstory.service';
import { DownloadDocumentsComponent } from "./download-documents/download-documents.component";

@NgModule({
    declarations: [
        LessonLandingPageComponent,
        LessonIntroVideoComponent,
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
        CourseSupportSectionComponent,
        CourseSummaryCountsComponent,
        CourseContentProgressCircleComponent,
        CourseOverviewLessonProgressBarComponent,
        HoursAndLandingsComponent,
        GenericResponsiveMatTableComponent,
        TableFormatPipe,
        ConvertToSpacesPipe,
        LessonTypePipe,
        NameToInitialsPipe,
        HoursLandingTypeToTextPipe,
        HoursLandingTypeToIconPipe,
        FilterComponent,
        FormatFilterPipe,
        BluePopUpComponent,
        CoursePreviewVideoPlayerComponent,
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
        CourseSupportSectionComponent,
        CourseSummaryCountsComponent,
        CourseContentProgressCircleComponent,
        CourseOverviewLessonProgressBarComponent,
        GenericResponsiveMatTableComponent,
        TableFormatPipe,
        ConvertToSpacesPipe,
        LessonTypePipe,
        NameToInitialsPipe,
        HoursLandingTypeToTextPipe,
        HoursLandingTypeToIconPipe,
        FilterComponent,
        FormatFilterPipe,
        BluePopUpComponent,
        CoursePreviewVideoPlayerComponent,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        CirrusSanitizerService,
        UiDownloadService,
        FullstoryService,
    ],
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
        RouterModule,
        DownloadDocumentsComponent
    ]
})
export class UiModule {}
