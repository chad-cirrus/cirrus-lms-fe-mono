import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions';

export const initialState: any = {};

export const configReducer = createReducer(
  initialState,
  on(appActions.fetchConfig, state => ({ ...state }))
);
