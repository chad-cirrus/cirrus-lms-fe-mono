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
      .addSvgIcon('eye', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/eye.svg'))
      .addSvgIcon(
        'open_lessons',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/open_lessons.svg'),
      )
      .addSvgIcon('milestone', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/milestone.svg'))
      .addSvgIcon('play', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/video_play.svg'))
      .addSvgIcon(
        'enrollment_history',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/enrollment_history.svg'),
      )
      .addSvgIcon('not_started', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/not-started.svg'))
      .addSvgIcon('in_progress', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/in_progress.svg'))
      .addSvgIcon(
        'completed',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/complete_check.svg'),
      )
      .addSvgIcon(
        'awarded_certificate_icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/awarded_certificate_icon.svg'),
      )
      .addSvgIcon(
        'course_transcript_icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/course_transcript_icon.svg'),
      )
      .addSvgIcon(
        'assessments_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/assessments_icon_circle.svg'),
      )
      .addSvgIcon(
        'documents_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/documents_icon_circle.svg'),
      )
      .addSvgIcon(
        'lessons_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/lessons_icon_circle.svg'),
      )
      .addSvgIcon(
        'quizzes_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/quizzes_icon_circle.svg'),
      )
      .addSvgIcon(
        'videos_icon_circle',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/videos_icon_circle.svg'),
      )
      .addSvgIcon(
        'cross_country_hrs',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/cross-country-icon.svg'),
      )
      .addSvgIcon(
        'flight_hrs',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/flight-hours-icon.svg'),
      )
      .addSvgIcon(
        'ground_hrs',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/ground-hours-icon.svg'),
      )
      .addSvgIcon('sim_hrs', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/simulator_icon.svg'))
      .addSvgIcon(
        'download_arrow',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/download-arrow.svg'),
      )
      .addSvgIcon(
        'landings',
        this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/landing_hours_icon.svg'),
      )
      .addSvgIcon('re-enroll', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/re-enroll.svg'))
      .addSvgIcon('assessment3', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/assessment3.svg'))
      .addSvgIcon('logbook', this.domSanitizer.bypassSecurityTrustResourceUrl('courses/images/svg/logbook.svg'));
  }
}
