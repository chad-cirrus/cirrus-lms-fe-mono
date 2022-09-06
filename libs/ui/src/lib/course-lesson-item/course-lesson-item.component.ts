import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ICourseOverviewLesson, ICourseOverviewStage, LESSON_TYPE } from '@cirrus/models';
import { progressTextMapperDictionary } from '../helpers/progressTextMapper';
import { IContentCountAndCompletionTime } from '../course-lesson-content-count/course-lesson-content-count.component';
import { CourseState } from '../../../../../apps/courses/src/app/store/reducers/course.reducer';
import { Store } from '@ngrx/store';
import { selectCourseOverview } from '../../../../../apps/courses/src/app/store/selectors/course.selector';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StageLessonNavigationEvent } from '../StageLessonNavigationEvent';

@Component({
  selector: 'cirrus-course-lesson-item',
  templateUrl: './course-lesson-item.component.html',
  styleUrls: ['./course-lesson-item.component.scss'],
})
export class CourseLessonItemComponent {
  private environment: Record<string, unknown>;
  @Input() stage!: ICourseOverviewStage;
  @Input() courseLesson!: ICourseOverviewLesson;
  @Output() navigate = new EventEmitter<StageLessonNavigationEvent>();

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

  get contentCountsCompletionTime(): IContentCountAndCompletionTime {
    return {
      content_counts: this.courseLesson.content_counts,
      completion_time: this.courseLesson.completion_time,
    };
  }

  constructor(@Inject('environment') environment: Record<string, unknown>) {
    this.environment = environment;
  }

  emitNavigation() {
    this.navigate.emit({ stageId: this.stage.id, lessonId: this.courseLesson.id });
  }
}
