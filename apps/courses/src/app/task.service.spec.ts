import { TestBed } from '@angular/core/testing';

import { ITasksRequest, TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlightLogType, ILessonFlightLog } from '@cirrus/models';
import { environment } from '../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;
  let taskService: TaskService;
  const baseUrl = `${environment.baseUrl}/api/v4/flight_logs?course_attempt_id=213&content_id=218&lesson_id=369&stage_id=117`;

  let flightLog: ILessonFlightLog;

  let result: ILessonFlightLog[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.get(HttpTestingController);

    flightLog = {
      aircraft_make: 'CIRRUS',
      aircraft_model: 'SR20 FTD',
      aircraft_tail_id: '76',
      approaches: [],
      completed_actual_instrument_hours: 23,
      completed_cross_country_hours: 22,
      completed_cross_country_legs: 1,
      completed_day_landings: 1,
      completed_day_takeoffs: 1,
      completed_dual_received_hours: '2.0',
      completed_ground_instruction_hours: '4.0',
      completed_holding_patterns: 1,
      completed_night_hours: 33,
      completed_night_landings: 1,
      completed_night_takeoffs: 1,
      displayTypeHours: '2.0',
      completed_pic_hours: '4.0',
      completed_sim_hours: 2,
      completed_simulated_instrument_hours: 2,
      completed_solo_hours: 3,
      completed_total_hours: '30',
      completed_track_nav_aid_hours: 0,
      flight_log_type: FlightLogType.Simulator,
      from_airport: 'JFK',
      hobbs_in: '33.0',
      hobbs_out: '3.0',
      id: 65782,
      instructor_feedback: '',
      lesson_flight_log_date: '2020-02-02T06:00:00.000Z',
      route_path: 'asfd',
      to_airport: 'ATL',
    };

    const payload: ITasksRequest = {
      course_id: 0,
      course_attempt_id: 213,
      content_id: 218,
      lesson_id: 369,
      stage_id: 117
    };

    service.getLogbook(payload).subscribe(t => {
      result = t;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return display type hours with logbook payload', () => {
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: baseUrl,
    });
    req.flush([flightLog]);
    expect(result[0].displayTypeHours).toEqual(2);
  });
});
