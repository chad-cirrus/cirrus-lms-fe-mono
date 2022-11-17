/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IContent, ICourseOverview, ILesson } from '@cirrus/models';
import { StagesOverlayComponent } from '../stages-overlay/stages-overlay.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

enum LessonStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
}

@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent {
  private _lesson!: ILesson;
  private _buttonText!: string;
  private _isScreenSmall!: boolean;

  @Input()
  set isScreenSmall(value) {
    this.bgImage = this.setBackgroundImage(value);
  }

  get isScreenSmall() {
    return this._isScreenSmall;
  }

  @Input()
  set lesson(value: ILesson) {
    if (value.id === 0) {
      return;
    }
    this._lesson = value;
    this.bgImage = this.setBackgroundImage(this.isScreenSmall);
    const dictionary: { [key: string]: string } = {
      ['not_started']: 'Get Started',
      ['in_progress']: 'Resume Lesson',
      ['completed']: 'Next Lesson',
      ['failed']: '',
    };
    this._buttonText = dictionary[this.lesson.progress.status];
  }

  get lesson() {
    return this._lesson;
  }

  get buttonText() {
    return this._buttonText;
  }

  @ViewChild('drawer') drawer: any;
  showFiller = false;

  @Input() lessonId!: number;

  @Input() checkoutOffsRequired!: boolean | null;
  @Input() instructorView!: boolean;
  @Input() sideNavOpen!: boolean;
  @Input() courseOverview!: ICourseOverview;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() courseComplete: boolean = false;
  profileImageUrl = 'course/images/profile.png';
  bgImage: any;

  defaultMobileLesson =
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg';
  defaultDesktopLesson =
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg';

  libraryImageUrl = 'courses/images/library.png';
  bookOpenImageUrl = 'courses/images/book-open.png';
  @Output() fetchMediaOutput = new EventEmitter<IContent>();
  @Output() fetchMediaOutputIntro = new EventEmitter<IContent>();
  @Output() openSideNav = new EventEmitter();
  @Output() navigateToLesson = new EventEmitter<any>();
  @Output() displayOverviewOutput = new EventEmitter<string>();
  @Output() playNextLessonContent = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  get lessonImageFxLayoutAlign() {
    return this.sideNavOpen ? 'center center' : 'center start';
  }

  get playListButtonFilledIn() {
    return 'courses/images/svg/play_button_filled_in.svg';
  }

  setBackgroundImage(value: boolean): string {
    if (value) {
      return this.lesson?.mobile_hero_image_url
        ? this.lesson?.mobile_hero_image_url
        : this.defaultMobileLesson;
    } else {
      return this.lesson?.desktop_hero_image_url
        ? this.lesson?.desktop_hero_image_url
        : this.defaultDesktopLesson;
    }
  }

  startLesson() {
    const { student_intro_video, overview } = this.lesson;
    if (
      !student_intro_video &&
      this.lesson.progress.status === LessonStatus.NOT_STARTED
    ) {
      setTimeout(() => {
        this.displayOverview(overview);
      }, 1000);
      return;
    }
    if (
      student_intro_video &&
      this.lesson.progress.status === LessonStatus.NOT_STARTED
    ) {
      this.playIntroVideo();
    } else {
      this.playCurrentContent();
    }
  }

  displayOverview(overview: string) {
    this.displayOverviewOutput.next(overview);
  }

  fetchMedia(content: IContent) {
    this.fetchMediaOutput.next(content);
  }

  openSideNavClick() {
    this.openSideNav.emit();
  }

  navigate(payload: any) {
    this.drawer.close();
    this.navigateToLesson.emit(payload);
  }

  navigateToCourse() {
    this.router.navigate([`/courses/${this.courseOverview.id}}`]);
  }

  openModal() {
    const dialogRef = this.dialog.open(StagesOverlayComponent, {
      data: this.courseOverview,
      maxWidth: '100vw',
      maxHeight: '100%',
      height: '100%',
      width: '100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      const payload = { lesson: result, course: this.courseOverview };
      this.navigate(payload);
    });
  }

  emitOpenSideNav() {
    this.openSideNav.emit();
  }

  playCurrentContent() {
    const contentNotStarted = this.lesson.contents.find(
      c => c.progress.status === LessonStatus.NOT_STARTED
    );

    const contentInProgress = this.lesson.contents.find(
      c => c.progress.status === LessonStatus.IN_PROGRESS
    );

    if (!contentNotStarted && !contentInProgress) {
      this.playNextLessonContent.emit(this.courseOverview);
      return;
    }

    setTimeout(() => {
      if (contentNotStarted) {
        this.fetchMediaOutput.next(contentNotStarted);
      } else {
        this.fetchMediaOutput.next(contentInProgress);
      }
    }, 1000);
  }

  playIntroVideo() {
    const content: IContent = this.lesson.student_intro_video.content;
    setTimeout(() => {
      this.fetchMediaOutputIntro.next(content);
    }, 1000);
  }
}
