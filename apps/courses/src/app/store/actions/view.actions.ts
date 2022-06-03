import { createAction, props } from '@ngrx/store';

export const setInstructorView = createAction(
  '[app component] set instructor view',
  props<{ instructorView: boolean }>()
);

export const setSideNavOpen = createAction(
  '[app component] set sideNav open',
  props<{ sideNavOpen: boolean }>()
);

export const setIsScreenSmall = createAction(
  '[app component] set is screen small',
  props<{ isScreenSmall: boolean }>()
)

export const setIsScreenTablet = createAction(
  '[app component] set is screen tablet',
  props<{ isScreenTablet: boolean }>()
)
