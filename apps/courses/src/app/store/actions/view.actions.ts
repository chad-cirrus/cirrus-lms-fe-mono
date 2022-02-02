import { createAction, props } from '@ngrx/store';

export const setInstructorView = createAction(
  '[app component] set instructor view',
  props<{ instructorView: boolean }>()
);

export const setSideNavOpen = createAction(
  '[app component] set sideNav open',
  props<{ sideNavOpen: boolean }>()
);
