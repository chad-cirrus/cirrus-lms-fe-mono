import { ICourseOverview } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const fetchCourseOverview = createAction(
  '[courses component] fetch courseOverview',
  props<{ courseId: number }>()
);

export const fetchCourseOverviewSuccess = createAction(
  '[courses effects] fetch courseOverview success',
  props<{ courseOverview: ICourseOverview }>()
);

export const fetchCourseOverviewFailure = createAction(
  '[courses effects] fetch courseOverview failure',
  props<{ error: any }>()
);
