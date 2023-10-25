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
  subjects?: string[];
}

export class Answer {
  quiz_id!: number;
  question_id!: number;
  answer!: number;
  timestamp!: Date;
}

export class QuizAttempt {
  quiz_id!: number;
  quiz_start_time: Date | undefined;
  current_question = -1;
  answers!: Answer[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuiz(id: number): Observable<IQuizRequest> {
    return this.http
      .get<IQuizRequest>(`${environment.baseUrl}/api/v4/quizzes/${id}`)
      .pipe(map(response => response['quiz']));
  }
}
