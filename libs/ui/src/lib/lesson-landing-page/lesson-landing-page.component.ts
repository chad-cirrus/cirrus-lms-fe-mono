/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  Component,
  EventEmitter,
  Input,
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
  IStage,
} from '@cirrus/models';
import { StagesOverlayComponent } from '../stages-overlay/stages-overlay.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent {
  private _lesson!: ILesson;
  private _buttonText!: string;
  private _progress!: ICourseProgress[];

  get progress() {
    return this._progress;
  }

  set progress(progress: ICourseProgress[]) {
    this._progress = progress;
  }

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
    this._progress = this.setProgressForCard(); // todo null check
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
  @Input() isScreenSmall!: boolean;
  @Input() checkoutOffsRequired!: boolean | null;
  @Input() instructorView!: boolean;
  @Input() sideNavOpen!: boolean;
  @Input() workbook: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() courseComplete: boolean = false;
  profileImageUrl = 'course/images/profile.png';
  bgImage:any;
  libraryImageUrl = 'courses/images/library.png';
  bookOpenImageUrl = 'courses/images/book-open.png';
  @Output() fetchMediaOutput = new EventEmitter<IContent>();
  @Output() fetchMediaOutputIntro = new EventEmitter<IContent>();
  @Output() fetchScorm = new EventEmitter<IContent>();
  @Output() openSideNav = new EventEmitter();
  @Output() navigateToLesson = new EventEmitter<any>();
  @Output() displayOverviewOutput = new EventEmitter<string>();
  @Output() playNextLessonContent = new EventEmitter();

  constructor(private dialog: MatDialog, private sanitizer: DomSanitizer
    ) {}

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
            totalCourses: assessment_tasks_total,
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
        return;
      }, 1000);
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



  playCurrentContent() {
    const content =
      this.lesson.contents.find(
        c => c.progress.status === LessonStatus.NOT_STARTED
      )

      if(!content) {
        this.playNextLessonContent.emit(this.workbook);
        return;
      }


    setTimeout(() => {
      this.fetchMediaOutput.next(content);
    }, 1000);
  }

  playIntroVideo() {
    const content: IContent = this.lesson.student_intro_video.content;
    setTimeout(() => {
      this.fetchMediaOutputIntro.next(content);
    }, 1000);
  }
}
