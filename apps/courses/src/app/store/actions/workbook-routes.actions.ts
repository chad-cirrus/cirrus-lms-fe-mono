import { IWorkBook } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const fetchWorkbook = createAction(
  '[Courses Component] Fetch Workbook Routes',
  props<{ courseId: number }>()
);

export const fetchWorkbookSuccess = createAction(
  '[Courses Component] Fetch Workbook Routes Success',
  props<{ workbook: IWorkBook }>()
);

export const fetchWorkbookFailure = createAction(
  '[Courses Component] Fetch Workbook Routes Failure',
  props<{ error: any }>()
);
