/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  IContent,
  ILesson,
  ICourseProgress,
  ProgressType,
  LessonStatus,
  LessonProgress,
} from '@cirrus/models';
import { StagesOverlayComponent } from '../stages-overlay/stages-overlay.component';

@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent {
  private _lesson!: ILesson;
  private _buttonText!: string;

  @Input()
  set lesson(value: ILesson) {
    this._lesson = value;
    const dictionary: { [key: string]: string } = {
      ['not_started']: 'Get Started',
      ['in_progress']: 'Resume Lesson',
      ['completed']: 'Next Lesson',
      ['failed']: '',
    };
    this._buttonText = dictionary[this.lesson.progress.status];
    this._progress = this.setProgressForCard();
  }

  get lesson() {
    return this._lesson;
  }

  get buttonText() {
    return this._buttonText;
  }

  @ViewChild('drawer') drawer: any;
  showFiller = false;

  private _progress!: ICourseProgress[];

  get progress() {
    return this._progress;
  }

  @Input() lessonId!: number;
  @Input() isScreenSmall!: boolean;

  @Input() instructorView!: boolean;
  @Input() sideNavOpen!: boolean;
  @Input() workbook: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() courseComplete: boolean = false;
  profileImageUrl = 'course/images/profile.png';
  libraryImageUrl = 'courses/images/library.png';
  bookOpenImageUrl = 'courses/images/book-open.png';
  @Output() fetchMediaOutput = new EventEmitter<IContent>();
  @Output() fetchMediaOutputIntro = new EventEmitter<IContent>();
  @Output() fetchScorm = new EventEmitter<IContent>();
  @Output() openSideNav = new EventEmitter();
  @Output() navigateToLesson = new EventEmitter<any>();
  @Output() displayOverviewOutput = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  setProgressForCard() {
    let progress: ICourseProgress[] = [];

    const { lesson_type, lesson_stats } = this.lesson;
    const {
      ground_hours_completed,
      content_completed,
      content_total,
      flight_hours_completed,
      landings_completed,
      assessment_tasks_total,
      assessment_tasks_completed,
    } = lesson_stats;

    switch (lesson_type) {
      case 0:
        progress = [
          {
            type: ProgressType.SelfStudy,
            completedCourses: content_completed,
            totalCourses: content_total,
          },
        ];
        break;
      case 1:
        progress = [
          {
            type: ProgressType.SelfStudy,
            completedCourses: content_completed,
            totalCourses: content_total,
          },
          {
            type: ProgressType.Ground,
            completedCourses: ground_hours_completed,
          },
          {
            type: ProgressType.Assessment,
            completedCourses: assessment_tasks_completed,
            totalCourses: assessment_tasks_completed,
          },
        ];
        break;

      case 2:
        progress = [
          {
            type: ProgressType.SelfStudy,
            completedCourses: content_completed,
            totalCourses: content_total,
          },
          {
            type: ProgressType.Flight,
            completedCourses: flight_hours_completed,
          },
          {
            type: ProgressType.Ground,
            completedCourses: ground_hours_completed,
          },
          {
            type: ProgressType.Landings,
            completedCourses: landings_completed,
          },
          {
            type: ProgressType.Assessment,
            completedCourses: assessment_tasks_completed,
            totalCourses: assessment_tasks_total,
          },
        ];
        break;

      default:
        break;
    }

    return progress;
  }

  get lessonImageFxLayoutAlign() {
    return this.sideNavOpen ? 'center center' : 'center start';
  }

  get playListButtonFilledIn() {
    return 'courses/images/svg/play_button_filled_in.svg';
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
    }

    let content: IContent;
    if (
      student_intro_video &&
      this.lesson.progress.status === LessonStatus.NOT_STARTED
    ) {
      content = this.lesson.student_intro_video.content;
      document
        .querySelector('#cirrus-lesson-contents')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        this.fetchMediaOutputIntro.next(content);
      }, 1000);
    } else {
      content =
        this.lesson.contents.find(
          c => c.progress.status === LessonStatus.NOT_STARTED
        ) || this.lesson.contents[0];
      document
        .querySelector('#cirrus-lesson-contents')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        this.fetchMediaOutput.next(content);
      }, 1000);
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

  openModal() {
    const dialogRef = this.dialog.open(StagesOverlayComponent, {
      data: this.workbook,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      const payload = { lesson: result, course: this.workbook };
      this.navigate(payload);
    });
  }

  emitOpenSideNav() {
    this.openSideNav.emit();
  }

  playIntroVideo() {
    const content = this.lesson.student_intro_video.content;
    document
      .querySelector('#cirrus-lesson-contents')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      this.fetchMediaOutputIntro.next(content);
    }, 1000);
  }
}
