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
  LESSON_TYPE,
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
  @ViewChild('drawer') drawer: any;
  showFiller = false;
  @Input() lesson!: ILesson;
  @Input() lessonId!: number;
  @Input() isScreenSmall!: boolean;
  @Input() progress: ICourseProgress[] | null = [
    {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 10,
    },
    {
      type: ProgressType.Flight,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.Simulator,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
  ];
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

  get lessonImageFxLayoutAlign() {
    return this.sideNavOpen ? 'center center' : 'center start';
  }

  get playListButtonFilledIn() {
    return 'courses/images/svg/play_button_filled_in.svg';
  }

  get buttonText() {
    const dictionary: { [key: string]: string } = {
      ['not_started']: 'Get Started',
      ['in_progress']: 'Resume Lesson',
      ['completed']: 'Next Lesson',
      ['failed']: '',
    };
    return dictionary[this.lesson.progress.status];
  }

  startLesson() {
    const {student_intro_video, overview } = this.lesson;

    if(!student_intro_video && this.lesson.progress.status === LessonStatus.NOT_STARTED) {
      setTimeout(() => {
        this.displayOverview(overview)
      }, 1000)
    }

    let content: IContent;
    if(student_intro_video && this.lesson.progress.status === LessonStatus.NOT_STARTED) {
      content = this.lesson.student_intro_video.content
      document
      .querySelector('#cirrus-lesson-contents')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      this.fetchMediaOutputIntro.next(content);
    }, 1000);
    } else {
      content = (this.lesson.contents.find((c) => c.progress.status === LessonStatus.NOT_STARTED)) || this.lesson.contents[0]
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
}
