import { ChartColors } from './ChartColors';
import {
  FlightInstructionHour,
  MostMissedTask,
  MostPassedTask,
} from './IRecentActivityInstructors';

export interface ChartData {
  data: FlightInstructionHour[];
  chartColors: ChartColors;
  title: string;
  csvRightColumnTitle: string;
}

export interface HorizontalChartData {
  data: MostPassedTask[] | MostMissedTask[];
  chartColors: ChartColors;
  title: string;
  csvRightColumnTitle: string;
}

export interface HorizontalChartData {
  data: any[];
  chartColors: ChartColors;
  title: string;
  csvRightColumnTitle: string;
}
