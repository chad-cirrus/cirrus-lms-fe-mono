import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewState } from '../reducers/view.reducer';

export const selectViewFeature = createFeatureSelector<ViewState>('view');

export const selectInstructorView = createSelector(
  selectViewFeature,
  state => state.instructorView
);

export const selectSideNavOpen = createSelector(
  selectViewFeature,
  state => state.sideNavOpen
);
