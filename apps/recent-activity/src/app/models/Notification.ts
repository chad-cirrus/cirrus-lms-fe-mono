import { ICirrusUser } from '@cirrus/models';

export interface INotification {
  id: number;
  body: string;
  notific_type: string;
  created_at: string;
  certificate_id?: number;
  badge_id?: number;
  instructor?: ICirrusUser;
  student?: ICirrusUser;
  sender: ISender;
  notified_at: string;
  notifiable?: INotifiable;
}

export interface ISender {
  id: number;
  email: string;
  role: string;
  admin: boolean;
  deactivated: boolean;
  contact: IContact;
  salesforce_id: string;
  ctc_admin: boolean;
}

export interface IContact {
  id: number;
  firstname: string;
  lastname: string;
  name: string;
  contact_user?: ICirrusUser;
  contactid?: number;
}

export interface INotifiable {
  type: string;
  connection?: any;
}
