import { INotification } from '@cirrus/models';
import { IRecentActivity } from './IRecentActivity';

export interface IRecentActivityNotifications {
  recentActivity: IRecentActivity;
  notifications: INotification[];
}
