import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Answer,
  IAnswerResponse,
  IQuizAttempt,
  IQuizRequest,
  IStartQuiz,
  IStartQuizAttempt,
  IStartQuizResponse,
} from './quiz.types';

@Injectable({
  providedIn: 'root',
})
/**
 *
 * @class QuizService
 * @description A service for getting quiz data from a server
 * @param {HttpClient} http - The HttpClient used for making requests
 */
export class QuizService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @method getQuiz
   * @description Makes a request to the server to get quiz data
   * @param {number} id - The id of the quiz to get data for
   * @returns {Observable<IQuizRequest>} An observable containing the quiz data
   */
  getQuiz(id: number, course_attempt_id: number, lesson_id: number, stage_id: number): Observable<IQuizRequest> {
    return this.http
      .get<IQuizRequest>(`${environment.baseUrl}/api/v4/quizzes/${id}?course_attempt_id=${course_attempt_id}&lesson_id=${lesson_id}&stage_id=${stage_id}`)
      .pipe(map(response => response['content_player/quiz']));
  }

  /**
   * Starts a new quiz attempt.
   * @param attempt The quiz attempt data.
   * @returns An observable of the start quiz response.
   */
  startQuiz(attempt: IStartQuizAttempt): Observable<IStartQuizResponse> {
    const attemptData: IStartQuiz = { quiz_attempt: attempt };
    return this.http
      .post<IStartQuizResponse>(`${environment.baseUrl}/api/v5/quiz_attempts`, attemptData)
      .pipe(map(response => response));
  }

  /**
   *
   * @method submitAnswer
   * @description Submits a student's answer to a quiz question
   * @param {Answer} answer - The answer to submit
   * @returns {Observable<IAnswerResponse>} An observable containing the response from the server
   */
  submitAnswer(attempt_id: number, answer: Answer): Observable<IAnswerResponse> {
    const _data = {
      quiz_attempt_response: {
        question_option_id: answer.answer,
        quiz_question_id: answer.question_id,
        quiz_attempt_id: attempt_id,
      },
    };
    return this.http
      .post<IAnswerResponse>(
        `${environment.baseUrl}/api/v5/quiz_attempts/${attempt_id}/quiz_questions/${answer.question_id}/quiz_attempt_responses`,
        _data,
      )
      .pipe(map(response => response));
  }

  /**
   * Grades a quiz attempt.
   * @param attempt_id The ID of the quiz attempt to grade.
   * @returns An observable that emits the response from the server.
   */
  gradeQuiz(attempt_id: number): Observable<IQuizAttempt> {
    return this.http
      .put<IQuizAttempt>(`${environment.baseUrl}/api/v5/quiz_attempts/${attempt_id}/submit`, {})
      .pipe(map(response => response));
  }
}
