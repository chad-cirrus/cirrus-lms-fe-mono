/* eslint-disable @typescript-eslint/no-empty-interface */
import { ICirrusUser } from '@cirrus/models';
import { createReducer, on } from '@ngrx/store';
import * as fromCirrusUser from '../actions/cirrus-user.actions';

export interface UserState extends ICirrusUser {}

export const intitialUserState: UserState = {
  id: 0,
  email: '',
  authentication_token: '',
  admin: false,
  role: '',
  deactivated: false,
  salesforce_id: '',
  sf_lms_role: '',
  full_sfid: '',
  ctc_admin: false,
  name: 'Mike Yokey',
};

export const reducer = createReducer(
  intitialUserState,
  on(fromCirrusUser.setCirrusUser, (state, { cirrusUser }) => ({
    ...cirrusUser,
  }))
);
