import { IWorkBookRoutes } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const fetchWorkBookRoutes = createAction(
  '[Courses Component] Fetch Workbook Routes',
  props<{ courseId: number }>()
);

export const fetchWorkBookRoutesSuccess = createAction(
  '[Courses Component] Fetch Workbook Routes Success',
  props<{ routes: IWorkBookRoutes[] }>()
);

export const fetchWorkBookRoutesFailure = createAction(
  '[Courses Component] Fetch Workbook Routes Failure',
  props<{ error: any }>()
);
