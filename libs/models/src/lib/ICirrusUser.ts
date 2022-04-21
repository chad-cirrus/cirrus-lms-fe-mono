export interface ICirrusUser {
  id: number;
  email: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  authentication_token: string;
  token_expires?: Date | string;
  admin: boolean;
  role: string;
  deactivated: boolean;
  name: string;
  nts_user_id?: any;
  salesforce_id: string;
  sf_lms_role: string;
  session_index?: any;
  full_sfid: string;
  authentication_token_created_at?: Date | string;
  ctc_admin: boolean;
}
