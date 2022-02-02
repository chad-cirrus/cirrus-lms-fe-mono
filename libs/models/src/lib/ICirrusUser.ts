export interface ICirrusUser {
  id: number;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  authentication_token: string;
  token_expires?: Date;
  admin: boolean;
  role: string;
  deactivated: boolean;
  nts_user_id?: any;
  salesforce_id: string;
  sf_lms_role: string;
  session_index?: any;
  full_sfid: string;
  authentication_token_created_at?: Date;
  ctc_admin: boolean;
}
