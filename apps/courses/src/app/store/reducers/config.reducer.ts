import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions';

import { IConfig } from '@cirrus/models';

export interface AppState {
  busy: boolean;
  error: any;
  config: IConfig;
}

export const initialState: AppState = {
  busy: false,
  error: null,
  config: {
    a: '',
    b: false,
    c: 0,
  },
};

export const configReducer = createReducer(
  initialState,
  on(appActions.fetchConfig, state => ({ ...state, busy: true, error: null })),
  on(appActions.fetchConfigSuccess, (state, { configs }) => ({
    ...state,
    busy: false,
    error: null,
    config: { ...configs },
  }))
);
