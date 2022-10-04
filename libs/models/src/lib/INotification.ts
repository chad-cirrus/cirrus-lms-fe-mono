import { ICirrusUser } from './ICirrusUser';

export interface INotification {
  id: number;
  body: string;
  notific_type: NotificationType;
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

export enum NotificationType {
  message = 'message',
  student_invite = 'student_invite',
  instructor_invite = 'instructor_invite',
  badge = 'badge',
  certificate = 'certificate',
  training_center_invite = 'training_center_invite',
}
