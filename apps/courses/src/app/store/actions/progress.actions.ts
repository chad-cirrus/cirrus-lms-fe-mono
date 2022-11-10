/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProgress, IProgressUpdateResponses } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const startProgress = createAction(
  '[lesson component] start progress',
  props<{ id: number; courseId: number; stageId: number; lessonId: number }>()
);

export const startProgressSuccess = createAction(
  '[lesson effects] start progress success',
  props<{ responses: IProgressUpdateResponses }>()
);

export const startProgressFailure = createAction(
  '[lesson effects] start progress failure',
  props<{ error: any }>()
);

export const completeProgress = createAction(
  '[lesson component] complete progress',
  props<{
    id: number;
    courseId: number;
    stageId: number;
    lessonId: number;
    progress: IProgress;
  }>()
);

export const completeProgressSuccess = createAction(
  '[lesson effects] complete progress success',
  props<{ responses: IProgressUpdateResponses }>()
);

export const completeProgressFailure = createAction(
  '[lesson effects] complete progress failure',
  props<{ error: any }>()
);
