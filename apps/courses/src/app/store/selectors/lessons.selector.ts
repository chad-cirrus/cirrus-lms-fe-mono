import { IContentPlayerMenuItem } from '@cirrus/models';
import { mapContentTypeToIcon } from '@cirrus/ui';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from '../reducers/lesson.reducer';

export const selectLessonFeature = createFeatureSelector<LessonState>('lesson');

export const selectLesson = createSelector(
  selectLessonFeature,
  state => state.lesson
);

export const selectContent = (contentId: number) =>
  createSelector(
    selectLesson,
    lesson => lesson.contents.filter(c => c.id === contentId)[0]
  );

export const selectContentPlayerSubState = createSelector(
  selectLesson,
  lesson => ({
    contents: lesson.contents,
    system_name: lesson.system_name,
    menuItems: lesson.contents.map(
      c =>
        ({
          icon: mapContentTypeToIcon(c.content_type),
          text: c.title,
          id: c.id,
        } as IContentPlayerMenuItem)
    ),
  })
);

export const selectLessonStateBusy = createSelector(
  selectLessonFeature,
  state => state.busy
);
