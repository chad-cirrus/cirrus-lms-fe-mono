import { INotification, ITask } from '@cirrus/models';


export enum ConnectionStatus {
  Pending = 'pending',
  Connected = 'connected',
  Declined = 'declined',
  Disconnected = 'disconnected',
}

export enum FlightLogStatsType {
  RollingCalendarFlightLogs = 'rolling_calendar_flight_logs',
  CalendarYearFlightLogs = 'calendar_year_flight_logs',
  WeeklyFlightLogs = 'weekly_flight_logs',
}

export interface FlightHour {
  type: string;
  completed: number | null;
}

export interface OverallProgress {
  flight_hours: FlightHour[];
  instructor_flight_log_stats: InstructorFlightLogStats[];
}

export interface InstructorFlightLogStats {
  type: FlightLogStatsType;
  completed: FlightInstructionHour[];
}

export interface IStudent {
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

export interface FlightInstructionHour {
  total: number;
  month?: string;
  year: string;
  range?: string;
}

export interface Achievement {
  student_name: string;
  course_name: string;
  achieved_on: string;
}

export interface RecentStudents {
  recent_students: IStudent[];
  students: IStudent[];
}

export interface IRecentActivityInstructors {
  overall_progress: OverallProgress;
  instructor_students: RecentStudents;
  student_task_performance: StudentTaskPerformance;
  flight_instruction_hours: FlightInstructionHour[];
  achievements: Achievement[];
}

export interface IRecentActivityInstructorsNotifications {
  recentActivity: IRecentActivityInstructors;
  notifications: INotification[];
}

export interface StudentTaskPerformance {
  top_missed_tasks: MostMissedTask[];
  top_passed_tasks: MostPassedTask[];
}
export interface MostMissedTask {
  task: ITask;
  success_count: number;
  failed_count: number;
}
export interface MostPassedTask {
  task: ITask;
  success_count: number;
  failed_count: number;
}

export const initialRecentActivityInstructors: IRecentActivityInstructors = {
  overall_progress: {
    flight_hours: [],
    instructor_flight_log_stats: [],
  },
  instructor_students: { recent_students: [], students: [] },

  student_task_performance: {
    top_passed_tasks: [],
    top_missed_tasks: [],
  },

  flight_instruction_hours: [
    {
      total: 33.2,
      month: 'APR',
      year: '2022',
    },
    {
      total: 78.2,
      month: 'MAY',
      year: '2022',
    },
    {
      total: 76,
      month: 'JUNE',
      year: '2022',
    },
    {
      total: 22,
      month: 'JULY',
      year: '2022',
    },
    {
      total: 334.2,
      month: 'AUG',
      year: '2022',
    },
    {
      total: 78.2,
      month: 'SEPT',
      year: '2022',
    },
    {
      total: 76,
      month: 'OCT',
      year: '2022',
    },
    {
      total: 22,
      month: 'NOV',
      year: '2022',
    },
    {
      total: 334.2,
      month: 'DEC',
      year: '2022',
    },
    {
      total: 78.2,
      month: 'JAN',
      year: '2022',
    },
    {
      total: 76,
      month: 'FEB',
      year: '2022',
    },
    {
      total: 22,
      month: 'MAR',
      year: '2022',
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
