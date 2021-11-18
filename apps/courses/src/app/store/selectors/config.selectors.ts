import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/config.reducer';

export const selectConfigFeature = createFeatureSelector<AppState>('config');

export const selectConfigs = createSelector(
  selectConfigFeature,
  config => config.config
);
