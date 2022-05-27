import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IInitialFile,
  ILesson,
  IProgress,
  IProgressUpdateResponses,
  IWorkBook,
  PROGRESS_STATUS,
  PROGRESS_TYPE,
} from '@cirrus/models';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { completeProgressHandler } from '../shared/complete-progress.handler';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _lessonCompleted = new Subject<string>();
  lessonComplete$ = this._lessonCompleted.asObservable();

  private coursesUrl = 'api/v4/courses';
  private scormUrl = 'scorm';
  notificationsCount$ = this.http
    .get<Notification[]>(
      `${environment.baseUrl}/api/v3/notifications/my-notifications`
    )
    .pipe(map(notif => notif.length));

  constructor(private http: HttpClient) {}

  getLessons(courseId: number, lessonId: number): Observable<ILesson> {
    return this.http.get<ILesson>(
      `${environment.baseUrl}/${this.coursesUrl}/${courseId}/lessons/${lessonId}`
    );
  }

  getWorkbook(courseId: number): Observable<IWorkBook> {
    return this.http.get<IWorkBook>(
      `${environment.baseUrl}/${this.coursesUrl}/${courseId}/workbook`
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
            : ({ progresses: [] } as IProgressUpdateResponses)
        )
      );
  }

  completeProgress(id: number): Observable<IProgressUpdateResponses> {
    return this.http
      .post<IProgressUpdateResponses>(
        `${environment.baseUrl}/api/v4/progresses/${id}/complete`,
        {}
      )
      .pipe(
        map(responses =>
          responses
            ? responses
            : ({ progresses: [] } as IProgressUpdateResponses)
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
}
