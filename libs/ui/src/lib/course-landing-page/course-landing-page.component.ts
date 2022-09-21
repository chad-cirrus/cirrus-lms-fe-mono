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
    const data = {
      title: 'Terms And Conditions',
      subTitle:
        'Please read the following before re-enrolling then click Agree to continue',
      body: '<div>Testing updating agreement:</div><div><br></div><div>This training is limited to aircraft familiarization training and is not inclusive of all the knowledge and skill required for safe flight. I must comply with the regulations, exercise sound judgment, and maintain a high level of flying proficiency to minimize the risks associated with flight.&nbsp;</div><div><br></div><div>Safely flying under Instrument Flight Rules (IFR) requires peak levels of skill, sound decision making, and good risk management skills. Many IFR skills degrade over periods of inactivity and each pilot must assess risks for individual flights considering their proficiency levels required to handle forecasted weather, airspace, and other challenges that may arise. Pilots who desire to fly IFR are strongly encouraged to complete an Instrument Proficiency Check in 6-month intervals, regardless of IFR currency requirements.&nbsp;&nbsp;</div><div><br></div><div>I acknowledge that for my continued proficiency and safety, Cirrus Aircraft strongly rec ommends that all pilots conduct recurrent training from an approved Cirrus Standardized Instructor Pilot (CSIP) or Cirrus Training Center (CTC).</div><div><br></div><div>I acknowledge that my instructor will only observe my flight proficiency during this training for the task prescribed in this course. These tasks maynot be inclusive of all the knowledge and skill required to safely fly under visual or instrument flight rules.</div>',
      buttons: ['Agree', 'Disagree'],
    };

    const dialogRef = this.dialog.open(BluePopUpComponent, {
      data: data,
      height: '70%',
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.data === 'Agree') {
        this.openConfirmationModal();
      }
    });
  }

  openConfirmationModal() {
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
      const payload = { course_id: this.course.id, user_id: this.user.id };
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
