import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILessonFlightLog, ITask } from '@cirrus/models';
import { environment } from '../environments/environment';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

export interface ITasksRequest {
  course_attempt_id: number;
  content_id: number;
  lesson_id: number;
  stage_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private _tasksAndLogBooks = new BehaviorSubject<
    [ITask[], ILessonFlightLog[]]
  >([[], []]);
  tasksAndLogBooks$: Observable<[ITask[], ILessonFlightLog[]]> =
    this._tasksAndLogBooks.asObservable();

  getTasks(payload: ITasksRequest) {
    const { course_attempt_id, content_id, lesson_id, stage_id } = payload;
    return this.http.get<ITask[]>(
      `${environment.baseUrl}/api/v4/assessments?course_attempt_id=${course_attempt_id}&content_id=${content_id}&lesson_id=${lesson_id}&stage_id=${stage_id}`
    );
  }

  getLogbook(payload: ITasksRequest) {
    const { course_attempt_id, content_id, lesson_id, stage_id } = payload;
    return this.http.get<ILessonFlightLog[]>(
      `${environment.baseUrl}/api/v4/flight_logs?course_attempt_id=${course_attempt_id}&content_id=${content_id}&lesson_id=${lesson_id}&stage_id=${stage_id}`
    );
  }

  getTasksAndLogbook(payload: ITasksRequest): void {
    if (this._tasksAndLogBooks.value[0].length === 0) {
      forkJoin([this.getTasks(payload), this.getLogbook(payload)]).subscribe(
        response => this._tasksAndLogBooks.next(response)
      );
    }
  }
}
