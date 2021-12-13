import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from '../reducers/config.reducer';
import { LessonState } from '../reducers/lesson.reducer';

export const selectLessonFeature = createFeatureSelector<LessonState>('lesson');

export const selectLesson = createSelector(
  selectLessonFeature,
  state => state.lesson
);

export const selectLessonStateBusy = createSelector(
  selectLessonFeature,
  state => state.busy
);
