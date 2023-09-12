import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from '../reducers/course.reducer';
import { ICourseOverview, ILesson, courseOverview } from '@cirrus/models';

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
