import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAnswerResponse } from './models/IAnswerResponse';
import { IEvalRequest } from './models/IEvalRequest';
import { IEvalAttempt } from './models/IEvalAttempt';
import { IStartEvaluation } from './models/IStartEvaluation';
import { IStartEvalAttempt } from './models/IStartEvalAttempt';
import { IStartEvalResponse } from './models/IStartEvalResponse';

@Injectable({
  providedIn: 'root',
})
/**
 *
 * @class EvalService
 * @description A service for calling the quiz and exam APIs
 * @param {HttpClient} http - The HttpClient used for making requests
 */
export class EvaluationService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @method getQuiz
   * @description Makes a request to the API to get quiz data
   * @param {number} id - The id of the quiz to get data for
   * @returns {Observable<IEvalRequest>} An observable containing the quiz data
   */
  getQuiz(id: number, course_attempt_id: number, lesson_id: number, stage_id: number): Observable<IEvalRequest> {
    return this.http
      .get<IEvalRequest>(
        `${environment.baseUrl}/api/v4/quizzes/${id}?course_attempt_id=${course_attempt_id}&lesson_id=${lesson_id}&stage_id=${stage_id}`,
      )
      .pipe(map(response => response['content_player/quiz' as keyof object] as IEvalRequest));
  }

  /**
   *
   * @method getExam
   * @description Makes a request to the API to get exam data
   * @param {number} id - The id of the exam to get data for
   * @returns {Observable<IEvalRequest>} An observable containing the exam data
   */
  getExam(id: number, course_attempt_id: number, lesson_id: number, stage_id: number): Observable<IEvalRequest> {
    return this.http
      .get<IEvalRequest>(
        `${environment.baseUrl}/api/v4/exams/${id}?course_attempt_id=${course_attempt_id}&lesson_id=${lesson_id}&stage_id=${stage_id}`,
      )
      .pipe(map(response => response['content_player/exam' as keyof object] as IEvalRequest));
  }
  /**
   * Calls the API to start a new quiz attempt.
   * @param attempt The quiz attempt data.
   * @returns An observable of the start quiz attempt response.
   */
  startQuiz(attempt: IStartEvalAttempt): Observable<IStartEvalResponse> {
    const attemptData: IStartEvaluation = { quiz_attempt: attempt };
    return this.http
      .post<IStartEvalResponse>(`${environment.baseUrl}/api/v5/quiz_attempts`, attemptData)
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
  gradeQuiz(attempt_id: number): Observable<IEvalAttempt> {
    return this.http
      .put<IEvalAttempt>(`${environment.baseUrl}/api/v5/quiz_attempts/${attempt_id}/submit`, {})
      .pipe(map(response => response['quiz_attempt' as keyof object] as IEvalAttempt));
  }
}
