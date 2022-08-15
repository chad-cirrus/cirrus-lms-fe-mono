import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [HttpClientModule],
})
export class MatIconRegistryModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry
      .addSvgIcon(
        'eye',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/eye.svg'
        )
      )
      .addSvgIcon(
        'open_lessons',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/open_lessons.svg'
        )
      )
      .addSvgIcon(
        'milestone',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/milestone.svg'
        )
      )
      .addSvgIcon(
        'play',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/video_play.svg'
        )
      )
      .addSvgIcon(
        'enrollment_history',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/enrollment_history.svg'
        )
      )
      .addSvgIcon(
        'not_started',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/not-started.svg'
        )
      )
      .addSvgIcon(
        'in_progress',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/in_progress.svg'
        )
      )
      .addSvgIcon(
        'completed',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/complete_check.svg'
        )
      )
      .addSvgIcon(
        'assessments_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/assessments_icon_circle.svg'
        )
      )
      .addSvgIcon(
        'documents_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/documents_icon_circle.svg'
        )
      )
      .addSvgIcon(
        'lessons_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/lessons_icon_circle.svg'
        )
      )
      .addSvgIcon(
        'quizzes_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/quizzes_icon_circle.svg'
        )
      )
      .addSvgIcon(
        'videos_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/videos_icon_circle.svg'
        )
      );
  }
}
