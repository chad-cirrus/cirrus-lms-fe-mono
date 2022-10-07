import { ICirrusUser } from './ICirrusUser';
import { ITrainingPartner } from './ITrainingPartner';

export class IConnection {
  id!: number;
  student!: ICirrusUser;
  connectable!: ITrainingPartner;
  status!: ConnectionStatus;
  airport!: string;
  name!: string;
  email!: string;
  training_qualifications!: string[];
  location!: string;
  phone!: string;
}

export enum ConnectionStatus {
  Pending = 'pending',
  Connected = 'connected',
  Declined = 'declined',
  Disconnected = 'disconnected',
}
