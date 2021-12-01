import { createReducer, on } from '@ngrx/store';
import * as appActions from '../actions';

import { IConfig } from '@cirrus/models';

export interface ConfigState {
  busy: boolean;
  error: any;
  config: IConfig;
}

export const initialState: ConfigState = {
  busy: false,
  error: null,
  config: {
    a: '',
    b: false,
    c: 0,
  },
};

export const reducer = createReducer(
  initialState,
  on(appActions.fetchConfig, state => ({ ...state, busy: true, error: null })),
  on(appActions.fetchConfigSuccess, (state, { configs }) => ({
    ...state,
    busy: false,
    error: null,
    config: { ...configs },
  })),
  on(appActions.fetchConfigFailure, (state, { error }) => ({
    ...initialState,
    error,
  }))
);
