import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICourseOverview,
  IInitialFile,
  ILesson,
  INotification,
  IProgress,
  IProgressUpdateResponses,
  PROGRESS_TYPE,
} from '@cirrus/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { completeProgressHandler } from '../shared/complete-progress.handler';
import { ITasksRequest, TaskService } from '../task.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _lessonCompleted = new Subject<string>();
  lessonComplete$ = this._lessonCompleted.asObservable();

  notificationMenuStateToggleSubject = new BehaviorSubject(false);
  notificationMenuStateToggle$ =
    this.notificationMenuStateToggleSubject.asObservable();

  private coursesUrl = 'api/v4/courses';
  private scormUrl = 'scorm';

  notificationSubject = new BehaviorSubject<INotification[]>([]);
  notifications$ = this.notificationSubject.asObservable();

  constructor(private http: HttpClient, private taskService: TaskService) {}

  getNotifications() {
    this.http
      .get<INotification[]>(
        `${environment.baseUrl}/api/v3/notifications/my-notifications`
      )
      .subscribe(val => {
        this.notificationSubject.next(val);
      });
  }

  getLessons(
    courseId: number,
    stageId: number,
    lessonId: number
  ): Observable<ILesson> {
    return this.http
      .get<ILesson>(
        `${environment.baseUrl}/${this.coursesUrl}/${courseId}/stages/${stageId}/lessons/${lessonId}`
      )
      .pipe(
        tap(lesson => {
          const assessmentContents = lesson.contents.filter(c =>
            [9, 10].includes(c.content_type)
          );
          assessmentContents
            .map(
              c =>
                ({
                  course_attempt_id: lesson.course_attempt_id,
                  content_id: c.id,
                  lesson_id: lesson.id,
                  stage_id: lesson.stage_id,
                } as ITasksRequest)
            )
            .forEach(request => {
              this.taskService.getTasksAndLogbook(request);
            });
        })
      );
  }

  getScorm(blob_directory: string): Observable<IInitialFile> {
    return this.http.get<IInitialFile>(
      `${environment.baseUrl}/${this.scormUrl}/${blob_directory}`
    );
  }

  startProgress(id: number): Observable<IProgressUpdateResponses> {
    return this.http
      .post<IProgressUpdateResponses>(
        `${environment.baseUrl}/api/v4/progresses/${id}/start`,
        {}
      )
      .pipe(
        map(responses =>
          responses
            ? responses
            : ({
                progresses: [],
                progress_stats: [],
              } as IProgressUpdateResponses)
        )
      );
  }

  completeProgress(
    id: number,
    progress: IProgress
  ): Observable<IProgressUpdateResponses> {
    return this.http
      .post<IProgressUpdateResponses>(
        `${environment.baseUrl}/api/v4/progresses/${id}/complete`,
        { ...progress.scorm }
      )
      .pipe(
        map(responses =>
          responses
            ? responses
            : ({
                progresses: [],
                progress_stats: [],
              } as IProgressUpdateResponses)
        ),
        tap(responses => {
          const { progresses } = responses;
          const { progress_type } = completeProgressHandler(progresses);

          if (
            [
              PROGRESS_TYPE.course.toString(),
              PROGRESS_TYPE.lesson.toString(),
            ].includes(progress_type)
          ) {
            this._lessonCompleted.next(progress_type);
          }
        })
      );
  }

  getCourseOverview(courseId: number) {
    return this.http.get<ICourseOverview>(
      `${environment.baseUrl}/api/v4/courses/${courseId}`
    );
  }
}
