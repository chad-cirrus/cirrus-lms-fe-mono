export interface IHoursAndLandingsStat {
  type: HoursAndLandingStatType | string;
  completed: number;
}

export enum HoursAndLandingStatType {
  completed_total_hours = 'completed_total_hours',
  completed_ground_instruction_hours = 'completed_ground_instruction_hours',
  completed_sim_hours = 'completed_sim_hours',
  completed_cross_country_hours = 'completed_cross_country_hours',
  completed_total_landings = 'completed_total_landings',
}
