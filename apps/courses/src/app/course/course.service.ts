import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILesson } from '@cirrus/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl =
    'http://cirrusapproach.local:3000/api/v4/courses/345/lessons/832';

  constructor(private http: HttpClient) {}

  getLessons(): Observable<ILesson> {
    return this.http.get<ILesson>(this.baseUrl);
  }
}
