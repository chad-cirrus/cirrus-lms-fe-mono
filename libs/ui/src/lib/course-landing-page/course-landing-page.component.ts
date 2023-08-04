import { Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ICirrusUser,
  ICourseOverview,
  ICoursePlayerConfig,
  IOrder,
  PROGRESS_STATUS,
  TermsAgreementSubtitleText,
} from '@cirrus/models';
import { produceConfig } from './produce-config';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { BluePopUpComponent } from '../blue-pop-up/blue-pop-up.component';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { CoursePreviewVideoPlayerComponent } from '../course-preview-video-player/course-preview-video-player.component';
import { downloadPdf } from '../helpers/DownloadPdf';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { TermsAgreementServiceService } from './terms-agreement-service.service';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { UiCourseService } from '../ui-course.service';
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
    overview: '',
    buttonText: 'Get Started',
    thumbnail: '',
    badge: '',
    preview: false,
    list_price: 0,
  };
  background = new BehaviorSubject({});
  background$ = this.background.asObservable();

  breadcrumbsTitle!: string;

  private _course!: ICourseOverview;
  private _size = Breakpoints.Large;

  private previewVideoUrlSubject = new BehaviorSubject<string | null>(null);
  public previewVideoUrl$ = this.previewVideoUrlSubject
    .asObservable()
    .pipe(
      filter(url => url !== null),
      map(url => this.cirrusSanitizer.getSafeResourceUrl(url as string)),
    );

  public isSticky = false;
  @ViewChild('coursePlayer') coursePlayerEl!: ElementRef;

  @Output() refreshCourse = new EventEmitter<number>();

  @Input() order!: IOrder | null;

  @Input()
  set course(value: ICourseOverview) {
    this._course = value;
    this.breadcrumbsTitle = value.course_attempt?.id
      ? 'My Courses'
      : 'Course Catalog';
    this.setBackground();

    if (!value.course_attempt?.id) {
      this.setPreviewCourseConfig(value);

      if(value.course_overview_video?.url) {
        this.previewVideoUrlSubject.next(
          `https://player.vimeo.com/video/${value.course_overview_video?.url}?app_id=122963`
        );
      }
      
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
    private uiCourseService: UiCourseService,
    private dialog: MatDialog,
    private tcService: TermsAgreementServiceService,
    private cirrusSanitizer: CirrusSanitizerService,
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
    if (this.user?.id || this.order?.id) {
      this.downloadService
        .courseEnroll(this.course, this.order)
        .subscribe(() => {
          this.router.navigate(['/shopping-cart']);
        });
    } else {
      this.downloadService
        .courseEnrollForUnauth(this.course)
        .subscribe(() => {
          this.router.navigate(['/shopping-cart']);
      });
    }
  }

  navigate() {
    this.router.navigate([
      `/courses/${this._course.id}/stages/${this._course.next_lesson.stage_id}/lessons/${this._course.next_lesson.id}`,
    ]);
  }

  watchPreview() {
    if (this.course.course_overview_video) {
      const courseVideoInfo = {
        ...this.course.course_overview_video,
        courseTitle: this.course.title
      }
      this.uiCourseService.watchPreview(courseVideoInfo);
    }
  }

  setPreviewCourseConfig(course: ICourseOverview) {
    this.coursePlayerConfig = {
      index: '',
      header: '',
      title: course.title,
      buttonText: 'Enroll Now',
      preview: !!course.course_overview_video,
      thumbnail: course.thumbnail_image_url
        ? course.thumbnail_image_url
        : (this.environment.defaultLessonThumbnail as string),
      badge: course.badge?.badge_image,
      list_price: course.list_price ? course.list_price : 0,
      overview: course.sales_desc? course.sales_desc : course.overview
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


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (this._size == '(max-width: 599.98px)') {
      const distanceToTop =
        this.coursePlayerEl.nativeElement.getBoundingClientRect().top;

      this.isSticky = distanceToTop <= 65;
    } else if (
      this._size == '(min-width: 600px) and (max-width: 959.98px)' ||
      this._size == '(min-width: 960px) and (max-width: 1279.98px)'
    ) {
      const distanceToTop =
        this.coursePlayerEl.nativeElement.getBoundingClientRect().top;
      this.isSticky = distanceToTop <= 78;
    } else if (
      this._size == '(min-width: 1280px) and (max-width: 1919.98px)' ||
      this._size == '(min-width: 1920px)'
    ) {
      this.isSticky = window.scrollY >= 130;
    }
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
