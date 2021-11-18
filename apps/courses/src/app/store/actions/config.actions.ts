import { IConfig } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const fetchConfig = createAction('[app component] fetch config');

export const fetchConfigSuccess = createAction(
  '[app componenet] fetchConfig success',
  props<{ configs: IConfig }>()
);

export const fetchConfigFailure = createAction(
  '[app componenet] fetchConfig failure',
  props<{ error: any }>()
);
