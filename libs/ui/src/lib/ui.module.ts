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
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LessonContentPlayerComponent } from './lesson-content-player/lesson-content-player.component';
import { LessonContentPlayerMenuComponent } from './lesson-content-player-menu/lesson-content-player-menu.component';

import { VideoPlayerComponent } from './video-player/video-player.component';
import { PlaceholderDirective } from './helpers/Placeholder.directive';
import { DownloadContentComponent } from './download-content/download-content.component';
import { ContentImageComponent } from './content-image/content-image.component';
import { ContentRichTextComponent } from './content-rich-text/content-rich-text.component';
import { CirrusSanitizerService } from './shared/cirrus-sanitizer.service';
import { AssessmentComponent } from './assessment/assessment.component';

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
    LessonContentPlayerComponent,
    LessonContentPlayerMenuComponent,
    VideoPlayerComponent,
    PlaceholderDirective,
    DownloadContentComponent,
    ContentImageComponent,
    ContentRichTextComponent,
    AssessmentComponent,
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
    LessonContentPlayerComponent,
    LessonContentPlayerMenuComponent,
    StagesOverlayComponent,
    VideoPlayerComponent,
    DownloadContentComponent,
    ContentImageComponent,
    ContentRichTextComponent,
    AssessmentComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    CirrusSanitizerService,
  ],
})
export class UiModule {}
