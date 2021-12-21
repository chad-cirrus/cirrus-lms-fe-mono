import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CirrusMaterialModule } from './cirrus-material.module';
import { LessonLandingPageComponent } from './lesson-landing-page/lesson-landing-page.component';
import { LessonContentItemComponent } from './lesson-content-item/lesson-content-item.component';
import { ProgressCardComponent } from './progress-card/progress-card.component';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  imports: [CommonModule, CirrusMaterialModule, FlexLayoutModule],
  declarations: [
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
    ProgressIndicatorComponent,
    PlaylistComponent,
  ],
  exports: [
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
    ProgressIndicatorComponent,
    PlaylistComponent,
  ],
})
export class UiModule {}
