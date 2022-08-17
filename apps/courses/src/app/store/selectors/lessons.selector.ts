import { CONTENT_TYPE, IContentPlayerMenuItem } from '@cirrus/models';
import { mapContentTypeToIcon } from '@cirrus/ui';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLesson from '../reducers/lesson.reducer';

export const selectLessonFeature =
  createFeatureSelector<fromLesson.LessonState>('lesson');

export const selectLesson = createSelector(
  selectLessonFeature,
  state => state.lesson
);

export const selectContent = (contentId: number) =>
  createSelector(
    selectLesson,
    lesson => lesson.contents.filter(c => c.id === contentId)[0]
  );

export const selectLessonStateBusy = createSelector(
  selectLessonFeature,
  state => state.busy
);

export const selectCheckOffRequired = createSelector(
  selectLesson,
  state =>
    state.contents
      .filter(
        content =>
          content.content_type === CONTENT_TYPE.flight_assessment ||
          content.content_type === CONTENT_TYPE.ground_assessment
      )
      .map(content => content.progress.status)
      .filter(status => status !== 'completed').length > 0
);

export const selectMenuItems = createSelector(selectLesson, lesson =>
  lesson.contents.map(
    c =>
      ({
        icon: mapContentTypeToIcon(c.content_type),
        text: c.title,
        id: c.id,
        progress: c.progress,
      } as IContentPlayerMenuItem)
  )
);
