import { ILesson } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const fetchLessons = createAction(
  '[courses component] fetch lessons',
  props<{ courseId: number; stageId: number; lessonId: number }>()
);

export const fetchLessonsSuccess = createAction(
  '[courses component] fetch lessons success',
  props<{ lesson: ILesson }>()
);

export const fetchLessonsFailure = createAction(
  '[courses component] fetch lessons failure',
  props<{ error: any }>()
);
