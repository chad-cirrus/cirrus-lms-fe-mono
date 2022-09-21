import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewState } from '../reducers/view.reducer';
import { Breakpoints } from '@angular/cdk/layout';

export const selectViewFeature = createFeatureSelector<ViewState>('view');

export const selectInstructorView = createSelector(
  selectViewFeature,
  state => state.instructorView
);

export const selectSideNavOpen = createSelector(
  selectViewFeature,
  state => state.sideNavOpen
);

export const selectIsScreenSmall = createSelector(
  selectViewFeature,
  state => state.screenSize === Breakpoints.XSmall
);

export const selectIsScreenTablet = createSelector(
  selectViewFeature,
  state => state.screenSize === Breakpoints.Small
);

export const selectScreenSize = createSelector(
  selectViewFeature,
  state => state.screenSize
);
