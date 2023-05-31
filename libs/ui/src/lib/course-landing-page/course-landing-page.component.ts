import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ICirrusUser,
  ICourse,
  ICourseOverview,
  ICoursePlayerConfig,
  PROGRESS_STATUS,
  TermsAgreementSubtitleText,
} from '@cirrus/models';
import { produceConfig } from './produce-config';
import { Breakpoints } from '@angular/cdk/layout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { MatDialog } from '@angular/material/dialog';
import { BluePopUpComponent } from '../blue-pop-up/blue-pop-up.component';
import { downloadPdf } from '../helpers/DownloadPdf';
import { map } from 'rxjs/operators';
import { TermsAgreementServiceService } from './terms-agreement-service.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CoursePreviewVideoPlayerComponent } from '../course-preview-video-player/course-preview-video-player.component';

@Component({
  selector: 'cirrus-course-landing-page',
  templateUrl: './course-landing-page.component.html',
  styleUrls: ['./course-landing-page.component.scss'],
})
export class CourseLandingPageComponent {
  private readonly environment: Record<string, unknown>;
  certificateLoading$ = this.downloadService.certificateLoading$;
  transcriptLoading$ = this.downloadService.transcriptloading$;

  @Input() user!: ICirrusUser;

  coursePlayerConfig: ICoursePlayerConfig = {
    index: '',
    header: '',
    title: '',
    buttonText: 'Get Started',
    thumbnail: '',
    preview: false,
  };
  background = new BehaviorSubject({});
  background$ = this.background.asObservable();

  breadcrumbsTitle!: string;

  private _course!: ICourseOverview;
  private _size = Breakpoints.Large;

  @Output() refreshCourse = new EventEmitter<number>();

  @Input()
  set course(value: ICourseOverview) {
    this._course = value;
    this.breadcrumbsTitle = value.course_attempt?.id
      ? 'My Courses'
      : 'Course Catalog';
    this.setBackground();

    if (!value.course_attempt?.id) {
      this.setPreviewCourseConfig(value);
      return;
    }

    if (
      value.next_lesson !== null &&
      Object.keys(value.next_lesson).length > 0
    ) {
      this.coursePlayerConfig = produceConfig(
        value.next_lesson,
        value.progress,
        this.environment.defaultLessonThumbnail as string
      );
    }
  }

  get course() {
    return this._course;
  }

  @Input()
  set size(value: string) {
    this._size = value;
    this.setBackground();
  }

  get PROGRESS_STATUS() {
    return PROGRESS_STATUS;
  }

  constructor(
    private router: Router,
    private downloadService: UiDownloadService,
    private dialog: MatDialog,
    private tcService: TermsAgreementServiceService,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  navigateToCoursesOrCatalog() {
    const path = this.course.course_attempt?.id
      ? `/my-courses`
      : '/course-catalog';
    this.router.navigate([path]);
  }

  navigateToNextLesson() {
    const { accepted_agreement } = this.course.course_attempt.user_course;
    if (!accepted_agreement) {
      this.tcService
        .openTermsAndConditionsModal(
          this.course,
          TermsAgreementSubtitleText.START
        )
        .subscribe(bool => {
          if (bool) {
            this.navigate();
          }
        });
    } else {
      this.navigate();
    }
  }

  enroll() {
    this.downloadService.courseEnroll(this.course).subscribe();
  }

  navigate() {
    this.router.navigate([
      `/courses/${this._course.id}/stages/${this._course.next_lesson.stage_id}/lessons/${this._course.next_lesson.id}`,
    ]);
  }

  watchPreview() {
    this.dialog.open(CoursePreviewVideoPlayerComponent, {
      data: this.course.course_overview_video,
      width: '100%',
      backdropClass: 'course-preview-video',
      panelClass: 'course-preview-video',
    });
  }

  setPreviewCourseConfig(course: ICourseOverview) {
    this.coursePlayerConfig = {
      index: '',
      header: '',
      title: course.title,
      buttonText: 'Enroll Now',
      preview: true,
      thumbnail: course.thumbnail_image_url
        ? course.thumbnail_image_url
        : (this.environment.defaultLessonThumbnail as string),
    };
  }

  downloadCert() {
    if (this.course.certificate.id) {
      this.downloadService
        .downloadCertificate(this.course.certificate.id)
        .subscribe((data: Blob) => {
          downloadPdf(data, 'cert');
        });
    }
  }

  reEnroll() {
    const payload: ModalPayload = {
      course_id: this.course.id,
      user_id: this.user.id,
    };
    this.tcService
      .openTermsAndConditionsModal(
        this.course,
        TermsAgreementSubtitleText.REENROLL
      )
      .subscribe(bool => {
        if (bool) {
          this.openConfirmationModal(payload);
        }
      });
  }

  openConfirmationModal(payload: ModalPayload) {
    const data = {
      title: 'Confirm Re-Enrollment',
      body: 'You may take the course again without losing or resetting your previous course enrollment records and certificate. You can find your certificates/transcripts in the Enrollment History Tab.',
      buttons: ['Confirm', 'Cancel'],
    };
    const dialogRef = this.dialog.open(BluePopUpComponent, {
      data: data,
      width: '85%',
      maxWidth: '515px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.data === 'Confirm') {
        this.downloadService.courseReEnroll(payload).subscribe(() => {
          this.refreshCourse.emit(payload.course_id);
        });
      }
    });
  }

  downloadTranscript() {
    this.downloadService
      .downloadTranscript(this.course.id, 0)
      .subscribe((data: Blob) => {
        downloadPdf(data, 'trans');
      });
  }

  private setBackground() {
    const uri =
      this._size === Breakpoints.XSmall
        ? this.course.mobile_hero_image_url
        : this.course.desktop_hero_image_url;
    this.background.next({
      ['background']: `linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.33) 44.11%, rgba(0, 0, 0, 0) 100%),
                  linear-gradient(360deg,#000000 1.79%,rgba(0,0,0,.24) 19.37%,rgba(0,0,0,0) 25%),
                  url(${encodeURI(uri)}) no-repeat top / cover`,
    });
  }
}

interface ModalPayload {
  course_id: number;
  user_id: number;
}
