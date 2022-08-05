import { Component, Inject, Input, OnInit } from '@angular/core';
import { CourseOverviewLesson, LESSON_TYPE } from '@cirrus/models';
import { progressTextMapperDictionary } from '../helpers/progressTextMapper';

@Component({
  selector: 'cirrus-course-lesson-item',
  templateUrl: './course-lesson-item.component.html',
  styleUrls: ['./course-lesson-item.component.scss'],
})
export class CourseLessonItemComponent {
  private environment: Record<string, unknown>;
  @Input() courseLesson!: CourseOverviewLesson;

  get lessonType(): string {
    const lessonDict: { [lessonType: number]: string } = {
      [LESSON_TYPE.self_study]: 'Self Study',
      [LESSON_TYPE.ground]: 'Ground Assessment',
      [LESSON_TYPE.flight]: 'Flight Assessment',
    };

    return lessonDict[this.courseLesson.lesson_type];
  }

  get progress(): string {
    return progressTextMapperDictionary[this.courseLesson.progress.status];
  }

  get thumbnail(): string | unknown {
    return this.courseLesson.thumbnail_image_url &&
      this.courseLesson.thumbnail_image_url.length > 0
      ? this.courseLesson.thumbnail_image_url
      : this.environment.defaultDesktop + '';
  }

  constructor(@Inject('environment') environment: Record<string, unknown>) {
    this.environment = environment;
  }
}
