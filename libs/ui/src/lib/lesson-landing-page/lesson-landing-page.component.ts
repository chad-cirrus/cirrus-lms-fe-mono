import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ILesson,
  IPlayListItem,
  IProgress,
  IVideoMediaItem,
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
  @Input() instructorView!: boolean | null;
  profileImageUrl = '/courses/assets/ui/images/profile.png';
  libraryImageUrl = '/courses/assets/ui/images/library.png';
  bookOpenImageUrl = '/courses/assets/ui/images/book-open.png';

  @Output() fetchMediaOutput = new EventEmitter<IVideoMediaItem>();

  startLesson() {
    const videoMediaItem: IVideoMediaItem = {
      id: 148751763,
      url: '148751763',
      title: 'Intro Placeholder',
      contentTitle: 'Intro Placeholder',
    };
    this.fetchMediaOutput.next(videoMediaItem);
  }

  fetchMedia(item: IPlayListItem) {
    const { id, url, title, contentTitle } = item;
    const videoMediaItem: IVideoMediaItem = {
      id,
      url,
      title,
      contentTitle,
    };
    this.fetchMediaOutput.next(videoMediaItem);
  }
}
