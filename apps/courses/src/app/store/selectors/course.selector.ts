import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from '../reducers/course.reducer';

export const selectCourseFeature =
  createFeatureSelector<fromCourse.CourseState>('course');

export const selectCourseOverview = createSelector(
  selectCourseFeature,
  state => state.courseOverview
);

export const selectStages = createSelector(
  selectCourseOverview,
  overview => overview.stages
);

export const selectNextLessonPath = createSelector(
  selectCourseOverview,
  (overview): string | null => {
    const nextStage = overview.stages.find(stage => ['not_started', 'in_progress'].includes(stage.progress.status));
    if (nextStage === undefined) return null;

    const nextLesson = nextStage.lessons.find(lesson => ['not_started', 'in_progress'].includes(lesson.progress.status));
    if (nextLesson === undefined) {
      throw new Error(`Stage ${nextStage.id} is ${nextStage.progress.status} but has no incomplete lessons`);
      // TODO: Add Sentry to the project and capture this error
    }

    return `/courses/${overview.id}/stages/${nextStage.id}/lessons/${nextLesson.id}`;
  }
)
