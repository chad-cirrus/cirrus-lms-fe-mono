import { createAction, props } from '@ngrx/store';

export const setInstructorView = createAction(
  '[app component] set instructor view',
  props<{ instructorView: boolean }>()
);
