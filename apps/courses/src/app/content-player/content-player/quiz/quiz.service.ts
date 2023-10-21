import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface IQuestionOption {
  id: number;
  description: string;
}

export interface IQuestion {
  id: number;
  body: string;
  desc: string;

  question_options: IQuestionOption[];
  correct_options: IQuestionOption[];
}

export interface IQuizRequest {
  id: number;
  name: string;
  desc: string;
  quiz_questions: IQuestion[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuiz(id: number): Observable<IQuizRequest> {
    return this.http
      .get<IQuizRequest>(`${environment.baseUrl}/api/v4/quizzes/${id}`)
      .pipe(map(response => response));
  }
}
