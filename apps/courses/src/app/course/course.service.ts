import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILesson, IWorkBookRoutes } from '@cirrus/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl = 'http://cirrusapproach.local:3000/api/v4/courses/';

  constructor(private http: HttpClient) {}

  getLessons(): Observable<ILesson> {
    return this.http.get<ILesson>(this.baseUrl + '345/lessons/832');
  }

  getNavBarRoutes(courseId: number): Observable<IWorkBookRoutes[]> {
    return this.http.get<IWorkBookRoutes[]>(this.baseUrl + '211/workbook');
  }
}
