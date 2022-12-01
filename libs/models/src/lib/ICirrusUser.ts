export interface ICirrusUser {
  authentication_token: string;
  authentication_token_created_at?: Date | string;
  created_at?: Date | string;
  ctc_admin: boolean;
  deactivated: boolean;
  email: string;
  firstname: string;
  full_sfid: string;
  id: number;
  lastname: string;
  name: string;
  nts_user_id?: any;
  role: string;
  salesforce_id: string;
  session_index?: any;
  sf_lms_role: string;
  token_expires?: Date | string;
  updated_at?: Date | string;
  admin?: boolean;
}
