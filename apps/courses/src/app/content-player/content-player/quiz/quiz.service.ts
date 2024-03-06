import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAnswerResponse } from './models/IAnswerResponse';
import { IQuizRequest } from './models/IQuizRequest';
import { IQuizAttempt } from './models/IQuizAttempt';
import { IStartQuiz } from './models/IStartQuiz';
import { IStartQuizAttempt } from './models/IStartQuizAttempt';
import { IStartQuizResponse } from './models/IStartQuizResponse';

@Injectable({
  providedIn: 'root',
})
/**
 *
 * @class QuizService
 * @description A service for calling the quiz API
 * @param {HttpClient} http - The HttpClient used for making requests
 */
export class QuizService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @method getQuiz
   * @description Makes a request to the API to get quiz data
   * @param {number} id - The id of the quiz to get data for
   * @returns {Observable<IQuizRequest>} An observable containing the quiz data
   */
  getQuiz(id: number, course_attempt_id: number, lesson_id: number, stage_id: number): Observable<IQuizRequest> {
    return this.http
      .get<IQuizRequest>(
        `${environment.baseUrl}/api/v4/quizzes/${id}?course_attempt_id=${course_attempt_id}&lesson_id=${lesson_id}&stage_id=${stage_id}`,
      )
      .pipe(map(response => response['content_player/quiz' as keyof object] as IQuizRequest));
  }

  /**
   * Calls the API to start a new quiz attempt.
   * @param attempt The quiz attempt data.
   * @returns An observable of the start quiz attempt response.
   */
  startQuiz(attempt: IStartQuizAttempt): Observable<IStartQuizResponse> {
    const attemptData: IStartQuiz = { quiz_attempt: attempt };
    return this.http
      .post<IStartQuizResponse>(`${environment.baseUrl}/api/v5/quiz_attempts`, attemptData)
      .pipe(map(response => response));
  }

  /**
   * Submits an answer for a quiz question to the API.
   *
   * @param quiz_attempt_id - The ID of the quiz attempt.
   * @param quiz_attempt_question_id - The ID of the quiz attempt question.
   * @param question_option_id - The ID of the selected question option.
   * @returns An Observable that emits the response containing the answer information.
   */
  submitAnswer(
    quiz_attempt_id: number,
    quiz_attempt_question_id: number,
    question_option_id: number,
  ): Observable<IAnswerResponse> {
    const _payload = {
      quiz_attempt_question: {
        question_option_id: question_option_id,
      },
    };
    return this.http
      .put<IAnswerResponse>(
        `${environment.baseUrl}/api/v5/quiz_attempts/${quiz_attempt_id}/quiz_attempt_questions/${quiz_attempt_question_id}`,
        _payload,
      )
      .pipe(map(response => response));
  }

  /**
   * Calls the API grade quiz attempt endpoint.
   * @param attempt_id The ID of the quiz attempt to grade.
   * @returns An observable that emits the response from the server.
   */
  gradeQuiz(attempt_id: number): Observable<IQuizAttempt> {
    return this.http
      .put<IQuizAttempt>(`${environment.baseUrl}/api/v5/quiz_attempts/${attempt_id}/submit`, {})
      .pipe(map(response => response['quiz_attempt']));
  }
}
