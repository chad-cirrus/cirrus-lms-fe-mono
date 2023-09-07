import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/cirrus-user.reducer';

export const selectCirrusUserFeature =
  createFeatureSelector<UserState>('cirrusUser');

export const selectCirrusUser = createSelector(
  selectCirrusUserFeature,
  state => state
);

export const selectRole = createSelector(
  selectCirrusUserFeature,
  state => state && state.role
);

export const selectIsLoggedIn = createSelector(
  selectCirrusUserFeature,
  state => !!state && !!state.id && state.id !== 0
);
