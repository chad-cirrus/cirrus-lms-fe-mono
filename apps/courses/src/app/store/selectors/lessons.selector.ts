import { IContentPlayerMenuItem, ILesson } from '@cirrus/models';
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

export const selectLessonContents = createSelector(
  selectLessonFeature,
  state => state.lessonContents
);

export const selectAllLessonContents = createSelector(
  selectLessonContents,
  fromLesson.selectAllLessonContents
);

export const selectLessonWithContentEntities = createSelector(
  selectLesson,
  selectAllLessonContents,
  (lesson, contents) =>
    ({
      ...lesson,
      contents,
    } as ILesson)
);

export const selectContentPlayerSubState = createSelector(
  selectLessonWithContentEntities,
  lesson => ({
    contents: lesson.contents,
    lesson_title: lesson.title,
    menuItems: lesson.contents.map(
      c =>
        ({
          icon: mapContentTypeToIcon(c.content_type),
          text: c.title,
          id: c.id,
          progress: c.progress,
        } as IContentPlayerMenuItem)
    ),
  })
);

export const selectLessonStateBusy = createSelector(
  selectLessonFeature,
  state => state.busy
);
