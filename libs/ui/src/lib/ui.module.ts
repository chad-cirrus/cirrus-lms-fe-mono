import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CirrusMaterialModule } from './cirrus-material.module';
import { LessonLandingPageComponent } from './lesson-landing-page/lesson-landing-page.component';
import { LessonContentItemComponent } from './lesson-content-item/lesson-content-item.component';
import { ProgressCardComponent } from './progress-card/progress-card.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { InstructorBarComponent } from './instructor-bar/instructor-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonProgressComponent } from './lesson-progress/lesson-progress.component';

@NgModule({
  imports: [
    CommonModule,
    CirrusMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
    ProgressIndicatorComponent,
    PlaylistComponent,
    InstructorBarComponent,
    LessonProgressComponent,
  ],
  exports: [
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
    ProgressIndicatorComponent,
    PlaylistComponent,
    InstructorBarComponent,
    LessonProgressComponent,
  ],
})
export class UiModule {}
