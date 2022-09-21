import { ActionReducerMap } from '@ngrx/store';
import * as fromView from './view.reducer';
import * as fromCirrusUser from './cirrus-user.reducer';

export interface AppState {
  view: any;
  cirrusUser: any;
}

export const recentActivityReducers: ActionReducerMap<AppState> = {
  view: fromView.reducer,
  cirrusUser: fromCirrusUser.reducer,
};
