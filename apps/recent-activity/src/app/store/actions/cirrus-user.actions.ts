import { ICirrusUser } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const setCirrusUser = createAction(
  '[app component] set cirrus user',
  props<{ cirrusUser: ICirrusUser }>()
);
