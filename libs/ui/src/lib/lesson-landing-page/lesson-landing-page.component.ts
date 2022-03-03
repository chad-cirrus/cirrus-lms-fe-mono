import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CONTENT_TYPE,
  IContent,
  ILesson,
  IPlayListItem,
  IProgress,
  LessonProgress,
  PlayListItemStatus,
  ProgressType,
} from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent {
  @Input() lesson: ILesson = {
    id: 0,
    system_desc: '',
    created_at: '',
    updated_at: '',
    system_name: '',
    lesson_type: 0,
    title: '',
    overview: '',
    is_archived: false,
    contents_are_linear: false,
    is_preview: false,
    major_version: 0,
    minor_version: 0,
    contents: [],
    lesson_progress: LessonProgress.Unknown,
    self_study_progress: LessonProgress.Unknown,
    assessment_progress: LessonProgress.Unknown,
  };
  @Input() progress: IProgress[] | null = [
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
      type: ProgressType.Land,
      completedCourses: 10,
      totalCourses: 14,
    },
    {
      type: ProgressType.Land,
      completedCourses: 9,
      totalCourses: 12,
    },
    {
      type: ProgressType.Land,
      completedCourses: 12,
      totalCourses: 20,
    },
  ];
  @Input() instructorView!: boolean;
  @Input() sideNavOpen!: boolean;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() courseComplete: boolean = false;
  profileImageUrl = 'images/profile.png';
  libraryImageUrl = 'images/library.png';
  bookOpenImageUrl = 'images/book-open.png';

  @Output() fetchMediaOutput = new EventEmitter<IPlayListItem>();
  @Output() fetchScorm = new EventEmitter<IContent>();
  @Output() openSideNav = new EventEmitter();

  get lessonImageFxLayoutAlign() {
    return this.sideNavOpen ? 'center center' : 'center start';
  }

  get playListButtonFilledIn() {
    return 'images/svg/play_button_filled_in.svg';
  }

  private buttonMapper = {
    0: 'Get Started',
    1: 'Get Started',
    2: 'Resume Lesson',
    3: 'Next Lesson',
  };

  get buttonText() {
    return this.buttonMapper[this.lesson.lesson_progress];
  }

  private progressIconMapper = {
    0: 'images/svg/not-started.svg',
    1: 'images/svg/not-started.svg',
    2: 'images/svg/in_progress.svg',
    3: 'images/svg/complete_check.svg',
  };

  get selfStudyProgressIcon() {
    return this.progressIconMapper[this.lesson.self_study_progress];
  }

  get assessmentProgressIcon() {
    return this.progressIconMapper[this.lesson.assessment_progress];
  }

  get lessonProgress() {
    return LessonProgress;
  }

  startLesson() {
    const videoMediaItem: IPlayListItem = {
      id: 377578235,
      url: '377578235',
      title: 'Intro Placeholder',
      contentTitle: 'Intro Placeholder',
      type: CONTENT_TYPE.vimeo,
      status: PlayListItemStatus.Unknown,
      blob_directory: '',
    };
    this.fetchMediaOutput.next(videoMediaItem);
  }

  fetchMedia(item: IPlayListItem, content: IContent) {
    if (content.blob_directory !== null) {
      this.fetchScorm.next(content);
    } else {
      this.fetchMediaOutput.next(item);
    }
  }

  mapProgressTypeToUrl(type: ProgressType): string {
    switch (type) {
      case ProgressType.Flight: {
        return 'images/svg/progress-icon-flight.svg';
      }
      case ProgressType.Ground: {
        return 'images/svg/progress-icon-ground.svg';
      }
      default: {
        return 'images/svg/progress-icon-land.svg';
      }
    }
  }

  openSideNavClick() {
    this.openSideNav.emit();
  }
}
