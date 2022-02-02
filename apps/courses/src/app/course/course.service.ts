import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInitialFile, ILesson, IWorkBookRoutes } from '@cirrus/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesUrl = 'api/v4/courses';
  private scormUrl = 'scorm';

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
        }))
      );
  }

  getNavBarRoutes(courseId: number): Observable<IWorkBookRoutes[]> {
    return this.http.get<IWorkBookRoutes[]>(
      `${environment.baseUrl}/${this.coursesUrl}/${courseId}/workbook`
    );
  }

  getScorm(blob_directory: string): Observable<IInitialFile> {
    return this.http.get<IInitialFile>(
      `${environment.baseUrl}/${this.scormUrl}/${blob_directory}`
    );
  }
}
