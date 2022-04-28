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

import { OverlayModule } from '@angular/cdk/overlay';
import { MenuSliderComponent } from './menu-slider/menu-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LessonContentPlayerComponent } from './lesson-content-player/lesson-content-player.component';
import { LessonContentPlayerMenuComponent } from './lesson-content-player-menu/lesson-content-player-menu.component'

@NgModule({
  imports: [
    CommonModule,
    CirrusMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    OverlayModule,
    BrowserAnimationsModule
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
    LessonContentPlayerComponent,
    LessonContentPlayerMenuComponent,
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
    LessonContentPlayerComponent,
    LessonContentPlayerMenuComponent,
  ],
})
export class UiModule {}
