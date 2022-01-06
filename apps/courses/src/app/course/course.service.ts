import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILesson, IWorkBookRoutes } from '@cirrus/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl = environment.baseUrl + '/api/v4/courses';

  constructor(private http: HttpClient) {}

  getLessons(courseId: number, lessonId: number): Observable<ILesson> {
    return this.http
      .get<ILesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`)
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
