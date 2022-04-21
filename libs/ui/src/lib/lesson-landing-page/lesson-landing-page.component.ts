/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IContent,
  ILesson,
  IProgress,
  LESSON_TYPE,
  ProgressType,
} from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent {
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
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() courseComplete: boolean = false;
  profileImageUrl = 'course/images/profile.png';
  libraryImageUrl = 'courses/images/library.png';
  bookOpenImageUrl = 'courses/images/book-open.png';
  @Output() fetchMediaOutput = new EventEmitter<IContent>();
  @Output() fetchScorm = new EventEmitter<IContent>();
  @Output() openSideNav = new EventEmitter();

  get lessonImageFxLayoutAlign() {
    return this.sideNavOpen ? 'center center' : 'center start';
  }

  get playListButtonFilledIn() {
    return 'courses/images/svg/play_button_filled_in.svg';
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

  startLesson() {
    const content: IContent = {
      id: 593,
      order: 0,
      title: 'Intro',
      subtitle: 'Intro Video: Icing Awareness Course',
      status: 'not_started',
      score: 0,
      url: '355991595',
      meta_tags: [],
      content_tasks: [],
      quiz: null,
      content_type: 0,
      desc: 'Intro video for the icing awareness course.',
      content_file: '',
      placeholder_image:
        'https://content.cirrusapproach.com/cirruslmsherokuprodcontainer/content-items/scorm/d754d0afe672c18526c66d5c2e2a8311.1_Intro.jpg',
      jet_scoring: false,
      content_html: '',
      created_by: 'Cirrus Aircraft',
      upload_image: '',
      content_filename: '',
      starter_file: '',
      blob_directory: '',
      show_comments: true,
      estimated_time: '',
      created_at: '',
      updated_at: '',
      link_id: '',
      version: 0,
    };

    document
      .querySelector('#cirrus-lesson-contents')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      this.fetchMediaOutput.next(content);
    }, 1000);
  }

  fetchMedia(content: IContent) {
    if (content.blob_directory !== null) {
      this.fetchScorm.next(content);
    } else {
      this.fetchMediaOutput.next(content);
    }
  }

  mapProgressTypeToUrl(type: ProgressType): string {
    switch (type) {
      case ProgressType.Flight: {
        return 'courses/images/svg/progress-icon-flight.svg';
      }
      case ProgressType.Ground: {
        return 'courses/images/svg/progress-icon-ground.svg';
      }
      default: {
        return 'courses/images/svg/progress-icon-land.svg';
      }
    }
  }

  openSideNavClick() {
    this.openSideNav.emit();
  }
}
