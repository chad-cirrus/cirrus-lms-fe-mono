import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ICirrusUser,
  ICourseOverview,
  ICoursePlayerConfig,
  PROGRESS_STATUS,
} from '@cirrus/models';
import { produceConfig } from './produce-config';
import { Breakpoints } from '@angular/cdk/layout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BehaviorSubject } from 'rxjs';
import { UiDownloadService } from '../course-completion/ui-download.service';
import { MatDialog } from '@angular/material/dialog';
import { BluePopUpComponent } from '../blue-pop-up/blue-pop-up.component';
import { downloadPdf } from '../helpers/DownloadPdf';

@Component({
  selector: 'cirrus-course-landing-page',
  templateUrl: './course-landing-page.component.html',
  styleUrls: ['./course-landing-page.component.scss'],
})
export class CourseLandingPageComponent {
  loading$ = this.downloadService.loading$;
  @Input() user!: ICirrusUser;

  coursePlayerConfig: ICoursePlayerConfig = {
    index: '',
    header: '',
    title: '',
    buttonText: 'Get Started',
    thumbnail: 'courses/images/lesson-thumbnail.png',
  };
  background = new BehaviorSubject({});
  reEnrollIconUrl = 'courses/images/svg/re-enroll.svg';

  background$ = this.background.asObservable();

  private _course!: ICourseOverview;
  private _size = Breakpoints.Large;

  @Output() refreshCourse = new EventEmitter<number>();

  @Input()
  set course(value: ICourseOverview) {
    this._course = value;
    if (
      value.next_lesson !== null &&
      Object.keys(value.next_lesson).length > 0
    ) {
      this.coursePlayerConfig = produceConfig(
        value.next_lesson,
        value.progress
      );
    }
    this.setBackground();
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
    private dialog: MatDialog
  ) {}

  navigateToCourses() {
    this.router.navigate([`/my-courses`]);
  }

  navigateToNextLesson() {
    this.router.navigate([
      `/courses/${this._course.id}/stages/${this._course.next_lesson.stage_id}/lessons/${this._course.next_lesson.id}`,
    ]);
  }

  downloadCert() {
    this.downloadService
      .downloadCertificate(this.course.course_attempt.id)
      .subscribe((data: Blob) => {
        downloadPdf(data);
      });
  }

  reEnroll() {
    this.openTermsAndConditionsModal();
  }

  openTermsAndConditionsModal() {
    const payload: ModalPayload = {
      course_id: this.course.id,
      user_id: this.user.id,
    };

    if (!this.course.has_agreement) {
      this.downloadService.courseReEnroll(payload).subscribe(() => {
        this.refreshCourse.emit(payload.course_id);
      });
      return;
    }

    const data = {
      title: 'Terms And Conditions',
      subTitle:
        'Please read the following before re-enrolling then click Agree to continue',
      body: this.course.agreement_body,
      buttons: ['Agree', 'Disagree'],
    };

    const dialogRef = this.dialog.open(BluePopUpComponent, {
      data: data,
      height: '70%',
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.data === 'Agree') {
        this.openConfirmationModal(payload);
      }
    });
  }

  openConfirmationModal(payload: ModalPayload) {
    const data = {
      title: 'Terms And Conditions',
      body: 'You may take the course again without losing or resetting your previous course enrollment records and certificate. You can find your certificates/transcripts in the Enrollment History Tab.',
      buttons: ['Confirm', 'Cancel'],
    };
    const dialogRef = this.dialog.open(BluePopUpComponent, {
      data: data,
      width: '40%',
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
    // Todo implement this method when api is ready
    // this.downloadService
    //   .downloadTranscript(this.course.course_attempt.id)
    //   .subscribe();
  }

  private setBackground() {
    const uri =
      this._size === Breakpoints.XSmall
        ? this.course.mobile_hero_image_url
        : this.course.desktop_hero_image_url;
    this.background.next({
      ['background']: `linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.33) 44.11%, rgba(0, 0, 0, 0) 61.94%),
                  linear-gradient(360deg,#000000 1.79%,rgba(0,0,0,.24) 19.37%,rgba(0,0,0,0) 25%),
                  url(${encodeURI(uri)}) no-repeat center`,
      ['background-size']: 'cover',
      ['-webkit-background-size']: 'cover',
      ['-moz-background-size']: 'cover',
      ['-o-background-size']: 'cover',
    });
  }
}

interface ModalPayload {
  course_id: number;
  user_id: number;
}
