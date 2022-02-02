import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CONTENT_TYPE,
  IContent,
  ILesson,
  IPlayListItem,
  IProgress,
  IVideoMediaItem,
  PlayListItemStatus,
  ProgressType,
} from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-landing-page',
  templateUrl: './lesson-landing-page.component.html',
  styleUrls: ['./lesson-landing-page.component.scss'],
})
export class LessonLandingPageComponent {
  @Input() lesson: ILesson | null = {
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
  profileImageUrl = '/courses/assets/ui/images/profile.png';
  libraryImageUrl = '/courses/assets/ui/images/library.png';
  bookOpenImageUrl = '/courses/assets/ui/images/book-open.png';

  @Output() fetchMediaOutput = new EventEmitter<IPlayListItem>();
  @Output() fetchScorm = new EventEmitter<IContent>();

  get lessonImageFxLayoutAlign() {
    return this.sideNavOpen ? 'center center' : 'center start';
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
}
