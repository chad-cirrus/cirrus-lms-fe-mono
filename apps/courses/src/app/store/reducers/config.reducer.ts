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
    b: '',
    c: '',
  },
};

export const configReducer = createReducer(
  initialState,
  on(appActions.fetchConfig, state => ({ ...state, busy: true, error: null }))
);
