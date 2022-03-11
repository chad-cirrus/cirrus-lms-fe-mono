/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ASSESSMENT_TYPE,
  CONTENT_TYPE,
  IContent,
  ILesson,
  IPlayListItem,
  IProgress,
  LessonProgress,
  LESSON_TYPE,
  PlayListItemStatus,
  ProgressType,
} from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent implements OnInit {
  @Input() lesson!: ILesson;
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

  get lessonType() {
    return LESSON_TYPE;
  }

  private buttonMapper = {
    0: 'Get Started',
    1: 'Get Started',
    2: 'Resume Lesson',
    3: 'Next Lesson',
    4: null,
  };

  get buttonText() {
    return this.buttonMapper[this.lesson.lesson_progress ?? 0];
  }

  ngOnInit(): void {
    console.log(this.lesson);
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
