import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  IContent,
  ICourseOverviewLesson,
  ICourseOverviewStage,
  LESSON_TYPE,
} from '@cirrus/models';
import { progressTextMapperDictionary } from '../helpers/progressTextMapper';
import { IContentCountAndCompletionTime } from '../course-lesson-content-count/course-lesson-content-count.component';

import { StageLessonNavigationEvent } from '../StageLessonNavigationEvent';
import { UiCourseService } from '../ui-course.service';

@Component({
  selector: 'cirrus-course-lesson-item',
  templateUrl: './course-lesson-item.component.html',
  styleUrls: ['./course-lesson-item.component.scss'],
})
export class CourseLessonItemComponent {
  private environment: Record<string, unknown>;
  @Input() stage!: ICourseOverviewStage;
  @Input() courseLesson!: ICourseOverviewLesson;
  @Input() index!: number;
  @Output() navigate = new EventEmitter<StageLessonNavigationEvent>();
  @Input() previewCourse!: boolean;
  @Input() isPreviewVideo!: boolean;

  get lessonType(): string {
    const lessonDict: { [lessonType: number]: string } = {
      [LESSON_TYPE.self_study]: 'Self Study',
      [LESSON_TYPE.ground]: 'Ground Assessment',
      [LESSON_TYPE.flight]: 'Flight Assessment',
      [LESSON_TYPE.simulator]: 'Simulator',
    };

    return lessonDict[this.courseLesson.lesson_type];
  }

  get progress(): string {
    return progressTextMapperDictionary[this.courseLesson.progress.status];
  }

  get thumbnail(): string | unknown {
    const thumbnail =
      this.courseLesson.thumbnail_image_url &&
      this.courseLesson.thumbnail_image_url.length > 0
        ? this.courseLesson.thumbnail_image_url
        : this.environment.defaultLessonThumbnail + '';

    return thumbnail;
  }

  get contentCountsCompletionTime(): IContentCountAndCompletionTime {
    return {
      content_counts: this.courseLesson.content_counts,
      completion_time: this.courseLesson.completion_time,
    };
  }

  get hasIntroVidOrContent(): boolean {
    return (
      this.courseLesson.student_intro_video ||
      this.courseLesson.contents?.length
    );
  }

  get displayHoverState(): boolean {
    if (this.previewCourse) {
      return this.isPreviewVideo && this.hasIntroVidOrContent;
    } else {
      return true;
    }
  }

  constructor(
    @Inject('environment') environment: Record<string, unknown>,
    private uiCourseService: UiCourseService
  ) {
    this.environment = environment;
  }

  watchPreview() {
    let content;
    if (!this.isPreviewVideo) {
      return;
    }
    if (this.courseLesson.student_intro_video) {
      content = this.courseLesson.student_intro_video;
    } else if (this.courseLesson.contents?.length) {
      content = this.courseLesson.contents[0];
    }
    if (content) {
      const courseVideoInfo = {
        ...content,
        courseTitle: this.courseLesson.title
      }
      this.uiCourseService.watchPreview(courseVideoInfo);
    }
  }

  emitNavigation() {
    if (this.previewCourse) {
      this.watchPreview();
      return;
    }
    this.navigate.emit({
      stageId: this.stage.id,
      lessonId: this.courseLesson.id,
    });
  }
}
