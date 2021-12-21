import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILesson, IWorkBookRoutes } from '@cirrus/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl = 'http://cirrusapproach.local:3000/api/v4/courses/';

  constructor(private http: HttpClient) {}

  getLessons(lessonId: number): Observable<ILesson> {
    return this.http
      .get<ILesson>(this.baseUrl + '345/lessons/' + lessonId)
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
      this.baseUrl + courseId + '/workbook'
    );
  }
}
