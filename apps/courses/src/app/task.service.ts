import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightLogType, ILessonFlightLog, ITask, IAssessment } from '@cirrus/models';
import { environment } from '../environments/environment';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ITasksRequest {
  course_attempt_id: number;
  content_id: number;
  lesson_id: number;
  stage_id: number;
  course_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) { }

  private _tasksAndLogBooks = new BehaviorSubject<
    [ITask[], ILessonFlightLog[]]
  >([[], []]);
  tasksAndLogBooks$: Observable<[ITask[], ILessonFlightLog[]]> =
    this._tasksAndLogBooks.asObservable();

  createDisplayTypeProperty(logbook: ILessonFlightLog) {
    const { flight_log_type } = logbook;
    if (flight_log_type === FlightLogType.Simulator) {
      return logbook.completed_sim_hours;
    }
    if (flight_log_type === FlightLogType.Ground) {
      return logbook.completed_ground_instruction_hours;
    }
    if (flight_log_type === FlightLogType.Flight) {
      return logbook.completed_total_hours;
    }
    return '';
  }

  getTasks(payload: ITasksRequest) {
    const { content_id, lesson_id, stage_id, course_id } = payload;

  return this.http.get<IAssessment>(
      `${environment.baseUrl}/api/v4/courses/${course_id}/stages/${stage_id}/lessons/${lesson_id}/contents/${content_id}/assessment`
    ).pipe(map((response) => response.assessment_tasks.tasklist))

  }

  getLogbook(payload: ITasksRequest) {
    const { course_attempt_id, content_id, lesson_id, stage_id } = payload;
    return this.http
      .get<ILessonFlightLog[]>(
        `${environment.baseUrl}/api/v4/flight_logs?course_attempt_id=${course_attempt_id}&content_id=${content_id}&lesson_id=${lesson_id}&stage_id=${stage_id}`
      )
      .pipe(
        map(l => {
          return l.map(logbook => {
            return {
              ...logbook,
              displayTypeHours: this.createDisplayTypeProperty(logbook),
            };
          });
        })
      );
  }

  getTasksAndLogbook(payload: ITasksRequest): void {
    // why is this being called
    // is this scorm related if yes skip

    forkJoin([this.getTasks(payload), this.getLogbook(payload)]).subscribe(
      response => this._tasksAndLogBooks.next(response)
    );
  }
}
