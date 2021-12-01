import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TestAlphaComponent } from './test-alpha/test-alpha.component';
import { CirrusMaterialModule } from './cirrus-material.module';
import { LessonLandingPageComponent } from './lesson-landing-page/lesson-landing-page.component';
import { LessonContentItemComponent } from './lesson-content-item/lesson-content-item.component';
import { ProgressCardComponent } from './progress-card/progress-card.component';

@NgModule({
  imports: [CommonModule, CirrusMaterialModule, FlexLayoutModule],
  declarations: [
    TestAlphaComponent,
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
  ],
  exports: [
    TestAlphaComponent,
    LessonLandingPageComponent,
    LessonContentItemComponent,
    ProgressCardComponent,
  ],
})
export class UiModule {}
