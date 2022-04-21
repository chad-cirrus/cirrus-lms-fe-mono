import { ICirrusUser } from "./ICirrusUser";

export interface Notification {
  id?: number;
  body?: string;
  created_at?: number;
  sender?: ICirrusUser;
  notific_type?: NotificationType;
  badge?: string;
  certificate?: string;
  instructor?: string;
  student?: ICirrusUser;
  user: ICirrusUser;
  notified_at: string;
  notifiable: string;
  status: string;
}

// class Notifiable {
//   type: string;
//   connection?: Connection;
// }

export enum NotificationType {
  message = 0,
  student_invite = 1,
  instructor_invite = 2,
  badge = 3,
  certificate = 4,
  training_center_invite = 5,
}
