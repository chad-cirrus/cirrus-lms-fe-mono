import { IRecentActivity } from './IRecentActivity';
import { INotification } from './Notification';

export interface IRecentActivityNotifications {
  recentActivity: IRecentActivity;
  notifications: INotification[];
}
