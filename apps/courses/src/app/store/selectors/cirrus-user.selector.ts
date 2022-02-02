import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/cirrus-user.reducer';

export const selectCirrusUserFeature =
  createFeatureSelector<UserState>('cirrusUser');

export const selectRole = createSelector(
  selectCirrusUserFeature,
  state => state && state.role
);
