import { INotification } from '@cirrus/models';

export enum ConnectionStatus {
  Pending = 'pending',
  Connected = 'connected',
  Declined = 'declined',
  Disconnected = 'disconnected',
}

export interface FlightHour {
  type: string;
  completed: number | null;
}

export interface OverallProgress {
  flight_hours: FlightHour[];
}

export interface IRecentStudent {
  id: number;
  first_name: string;
  last_name: string;
  location?: string;
  connected: boolean;
  email?: string;
  phone?: string;
  connection: IConnectionInstructor;
}

export interface IConnectionInstructor {
  id: number;
  status: ConnectionStatus;
  student_id: number;
}

export interface StudentTaskPerformance {
  task_name: string;
  passed: string;
  missed: string;
}

export interface FlightInstructionHour {
  total: number;
  interval: string;
  year: string;
}

export interface Achievement {
  student_name: string;
  course_name: string;
  achieved_on: string;
}

export interface IRecentActivityInstructors {
  overall_progress: OverallProgress;
  recent_instructor_students: IRecentStudent[];
  students: any[];
  student_task_performance: StudentTaskPerformance[];
  flight_instruction_hours: FlightInstructionHour[];
  achievements: Achievement[];
}

export interface IRecentActivityInstructorsNotifications {
  recentActivity: IRecentActivityInstructors;
  notifications: INotification[];
}

export const initialRecentActivityInstructors: IRecentActivityInstructors = {
  overall_progress: {
    flight_hours: [],
  },
  recent_instructor_students: [],
  students: [],
  student_task_performance: [
    {
      task_name: 'task name',
      passed: '4',
      missed: '1',
    },
  ],
  flight_instruction_hours: [
    {
      total: 33.2,
      interval: '2',
      year: '3',
    },
  ],
  achievements: [
    {
      student_name: 'Andrew',
      course_name: 'CAPS',
      achieved_on: 'date here',
    },
  ],
};
