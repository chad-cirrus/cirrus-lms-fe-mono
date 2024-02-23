import { Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ICirrusUser,
  ICourseOverview,
  ICoursePlayerConfig,
  IOrder,
  PROGRESS_STATUS,
  PdfDownloadFile,
  TermsAgreementSubtitleText,
} from '@cirrus/models';
import { produceConfig } from './produce-config';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ElementRef, HostListener, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BluePopUpComponent } from '../blue-pop-up/blue-pop-up.component';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { downloadPdf } from '../helpers/DownloadPdf';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { UiCourseService } from '../ui-course.service';
import { TermsAgreementServiceService } from './terms-agreement-service.service';
import { FullstoryService } from '../lib-services/fullstory/fullstory.service';
import { FullStoryEvent } from '../lib-services/fullstory/full-story-event';
import { CoursesFacadeService } from '../../../../../apps/courses/src/app/courses-facade.service';

import { IDownloadableDocument } from '../download-documents/IDownloadbleDocument';
import { DOWNLOADABLE_DOCUMENT_TYPE } from '../download-documents/DOWNLOADABLE_DOCUMENT_TYPE';
import { ICourseCompletionData } from '../course-completion/course-completion.component';
@Component({
  selector: 'cirrus-course-landing-page',
  templateUrl: './course-landing-page.component.html',
  styleUrls: ['./course-landing-page.component.scss'],
})
export class CourseLandingPageComponent {
  private readonly environment: Record<string, unknown>;
  certificateLoading$ = this.downloadService.certificateLoading$;
  transcriptLoading$ = this.downloadService.transcriptloading$;

  certificateList: IDownloadableDocument[] | undefined;
  courseTranscript: IDownloadableDocument | undefined;
  courseCertificate: IDownloadableDocument | undefined;

  /**
   * The current document being downloaded, undefined if no document is being downloaded.
   * @type {IDownloadableDocument | undefined}
   * @memberof DownloadDocumentsComponent
   * @public
   * @default undefined
    */
  currentDocument: IDownloadableDocument | undefined;

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
  public previewVideoUrl$ = this.previewVideoUrlSubject.asObservable().pipe(
    filter(url => url !== null),
    map(url => this.cirrusSanitizer.getSafeResourceUrl(url as string))
  );

  public isSticky = false;
  @ViewChild('coursePlayer') coursePlayerEl!: ElementRef;

  @Output() refreshCourse = new EventEmitter<number>();

  @Input() order!: IOrder | null;

  @Input()
  set course(value: ICourseOverview) {
    this._course = value;

    //FS vars for page identification of the single course 
    this.facadeService.fullstoryInit();

    let courseStatus: string =
     this._course?.completed_at ? "Course Completed" :
     this._course.course_attempt?.id ? "Enrolled" :
     "Product Page";
   
    let fullStoryData = {
      'page_state': courseStatus
    }

    const fullstoryEvent = new FullStoryEvent(
      this._course.title,
      '',
      '',
      fullStoryData
    );

    this.fullStoryService.event(
      "Page State", fullstoryEvent
    );

    this.loadDocumentList(this._course.id);
    
    this.breadcrumbsTitle = value.course_attempt?.id
      ? 'My Courses'
      : 'Course Catalog';
    this.setBackground();

    if (!value.course_attempt?.id) {
      this.setPreviewCourseConfig(value);

      if (value.course_overview_video?.url) {
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

  get filtered_course_content_stats() {
    return this.course.course_content_stats.filter(
      stat => ['self_study', 'flight_assessment', 'ground_assessment'].includes(stat.type)
    );
  }

  constructor(
    private router: Router,
    private downloadService: UiDownloadService,
    private uiCourseService: UiCourseService,
    private dialog: MatDialog,
    private tcService: TermsAgreementServiceService,
    private cirrusSanitizer: CirrusSanitizerService,
    private fullStoryService: FullstoryService,
    private facadeService: CoursesFacadeService,
    
    @Inject(MAT_DIALOG_DATA)
    public data: ICourseCompletionData,
    private uiDownloadService: UiDownloadService,

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
    this.router.navigate(['/courses', this.course.id, 'enroll']);
  }

  isCourseFree(course: ICourseOverview) {
    if (course?.list_price) {
      return course?.list_price < 1
    }
    else {
      return true
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
        courseTitle: this.course.title,
      };
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
      overview: course.sales_desc ? course.sales_desc : course.overview,
    };
  }

  downloadCert() {
    if (this.course.certificate.id) {
      this.downloadService
        .downloadCertificate(this.course.certificate.id)
        .subscribe((data: PdfDownloadFile) => {
          downloadPdf(data);
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
        this.uiCourseService.courseReEnroll(payload).subscribe(() => {
          this.refreshCourse.emit(payload.course_id);
        });
      }
    });
  }

  downloadTranscript() {
    this.downloadService
      .downloadTranscript(this.course.id, 0)
      .subscribe((data: PdfDownloadFile) => {
        downloadPdf(data);
      });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (this.coursePlayerEl && this.coursePlayerEl.nativeElement) {
      const distanceToTop =
          this.coursePlayerEl.nativeElement.getBoundingClientRect().top;
      if (this._size == '(max-width: 599.98px)') {
        this.isSticky = distanceToTop <= 65;
      } else if (
        this._size == '(min-width: 600px) and (max-width: 959.98px)' ||
        this._size == '(min-width: 960px) and (max-width: 1279.98px)'
      ) {
        this.isSticky = distanceToTop <= 78;
      } else if (
        this._size == '(min-width: 1280px) and (max-width: 1919.98px)' ||
        this._size == '(min-width: 1920px)'
      ) {
        this.isSticky = window.scrollY >= 206;
      }
    }
  }

  /**
   * Loads the list of downloadable documents.
   * @private
   * @memberof DownloadDocumentsComponent
   * @returns {void}
   * @default undefined
   */
  loadDocumentList(id:number) {
    this.uiDownloadService.getCourse(id).subscribe(course => {
      this.courseTranscript = {
        id: course.certificate.id ? course.certificate.id : -1,
        documentType: DOWNLOADABLE_DOCUMENT_TYPE.transcript,
        displayText: 'Course Transcript',
        uuid: self.crypto.randomUUID(),
      };

      if (course.certificate && course.certificate.id) {
        this.courseCertificate = {
          id: course.certificate.id,
          documentType: DOWNLOADABLE_DOCUMENT_TYPE.courseCertificate,
          displayText: 'Course Certificate',
          uuid: self.crypto.randomUUID(),
        };
      }
      if (course.awarded_certificates && course.awarded_certificates?.length > 0) {
        this.certificateList = course.awarded_certificates.map(cert => {
          return {
            id: cert.id ? cert.id : -1,
            documentType: DOWNLOADABLE_DOCUMENT_TYPE.stageCertificate,
            name: cert.certifiable_name,
            displayText: cert.certifiable_name,
            uuid : self.crypto.randomUUID(),
          } as IDownloadableDocument;
        });
      }
    });
  }

  /**
   * Handles the download button click event.
   * @param {IDownloadableDocument} document The document to download.
   * @memberof DownloadDocumentsComponent
   * @returns {void}
   * @default undefined
   */
  downloadClicked(document: IDownloadableDocument): void {
    this.currentDocument = document;
    if (document.documentType === DOWNLOADABLE_DOCUMENT_TYPE.transcript) {
      this.uiDownloadService.downloadTranscript(this._course.id, 0).subscribe((data: PdfDownloadFile) => {
        downloadPdf(data);
        this.currentDocument = undefined;
      });
    } else {
      this.uiDownloadService.downloadCertificate(document.id).subscribe((data: PdfDownloadFile) => {
        downloadPdf(data);
        this.currentDocument = undefined;
      });
    }
  }

  private setBackground() {
    const uri =
      this._size === Breakpoints.XSmall
        ? this.course.mobile_hero_image_url
        : this.course.desktop_hero_image_url;
      this.background.next(uri);
  }
}

interface ModalPayload {
  course_id: number;
  user_id: number;
}
