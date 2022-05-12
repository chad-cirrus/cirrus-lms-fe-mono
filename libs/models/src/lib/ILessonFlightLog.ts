

export interface ILessonFlightLog {
  aircraft_make: string;
  aircraft_model: string;
  aircraft_tail_id: string;
  approaches: Approaches[];
  completed_actual_instrument_hours: number;
  completed_cross_country_hours: number;
  completed_cross_country_legs: number;
  completed_day_landings: number
  completed_day_takeoffs: number
  completed_dual_received_hours: string;
  completed_ground_instruction_hours: string;
  completed_holding_patterns: number;
  completed_night_hours: number;
  completed_night_landings: number;
  completed_night_takeoffs: number;
  completed_pic_hours: string;
  completed_sim_hours: number;
  completed_simulated_instrument_hours: number;
  completed_solo_hours: number;
  completed_total_hours: string;
  completed_track_nav_aid_hours: number;
  flight_log_type: string;
  from_airport: string;
  hobbs_in: string;
  hobbs_out: string;
  id: number;
  instructor_feedback: string;
  lesson_flight_log_date: string;
  route_path: string;
  to_airport: string;

}


export interface Approaches {
  type: string;
  airport: string;
  runway: string;
}
