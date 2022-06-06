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
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuSliderComponent } from './menu-slider/menu-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StagesOverlayComponent } from './stages-overlay/stages-overlay.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';

import {
  MatDialogModule,
  MAT_DIALOG_DATA,
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
import { PdfComponent } from './pdf/pdf.component';

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
    RecentActivityComponent,
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
    PdfComponent,
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
    RecentActivityComponent,
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
    PdfComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    CirrusSanitizerService,
  ],
})
export class UiModule {}
