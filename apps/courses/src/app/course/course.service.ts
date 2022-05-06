import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInitialFile, ILesson, IWorkBook, LessonHelper } from '@cirrus/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesUrl = 'api/v4/courses';
  private scormUrl = 'scorm';
  notificationsCount$ = this.http
    .get<Notification[]>(
      `${environment.baseUrl}/api/v3/notifications/my-notifications`
    )
    .pipe(map(notif => notif.length));

  constructor(private http: HttpClient) {}

  getLessons(courseId: number, lessonId: number): Observable<ILesson> {
    return this.http
      .get<ILesson>(
        `${environment.baseUrl}/${this.coursesUrl}/${courseId}/lessons/${lessonId}`
      )
      .pipe(
        map(lesson => ({
          ...lesson,
          contents: lesson.contents.map(content => ({
            ...content,
            estimated_time: '1:23',
          })),
        })),
        map(lesson => {
          const returnLesson = LessonHelper.createLessonObject(lesson);

          return returnLesson;
        })
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
}
