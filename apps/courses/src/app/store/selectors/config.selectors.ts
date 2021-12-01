import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { ConfigState } from '../reducers/config.reducer';

export const selectConfigFeature = createFeatureSelector<ConfigState>('config');

export const selectConfigs = createSelector(
  selectConfigFeature,
  state => state.config
);
