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
import { CONTENT_TYPE, IContent, ILesson } from '@cirrus/models';
import { IStartExam } from './models/IStartExam';
import { IStartExamAttempt } from './models/IStartExamAttempt';

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
   * @method getEvaluation
   * @description Makes a request to the API to get quiz or exam data
   * @param {number} id - The id of the quiz/exam to get data for
   * @returns {Observable<IEvalRequest>} An observable containing the quiz data
   */
  getEvaluation(content: IContent, lesson: ILesson): Observable<IEvalRequest> {
    const apiToken = content.content_type === CONTENT_TYPE.quiz ? 'quizzes' : 'exams';
    const evaluation: IEvalRequest = content.evaluation as IEvalRequest;
    const keyName = content.content_type === CONTENT_TYPE.quiz ? 'content_player/quiz' : 'content_player/exam';
    return this.http
      .get<IEvalRequest>(
        `${environment.baseUrl}/api/v5/${apiToken}/${evaluation.id}?course_attempt_id=${lesson.course_attempt_id}&lesson_id=${lesson.id}&stage_id=${lesson.stage_id}`,
      )
      .pipe(map(response => response[keyName as keyof object] as IEvalRequest));
  }

  /**
   * Calls the API to start a new quiz attempt.
   * @param attempt The quiz attempt data.
   * @returns An observable of the start quiz attempt response.
   */
  startEvaluation(attempt: IStartEvalAttempt): Observable<IStartEvalResponse> {
    const attemptData: IStartEvaluation = { evaluation_attempt: attempt };
    return this.http
      .post<IStartEvalResponse>(`${environment.baseUrl}/api/v5/evaluation_attempts`, attemptData)
      .pipe(map(response => response));
  }

  /**
   * Calls the API to start a new quiz attempt.
   * @param attempt The quiz attempt data.
   * @returns An observable of the start quiz attempt response.
   */
  startExam(attempt: IStartEvalAttempt): Observable<IStartEvalResponse> {
    const attemptData: IStartExam = { exam_attempt: attempt };
    return this.http
      .post<IStartEvalResponse>(`${environment.baseUrl}/api/v5/evaluation_attempts`, attemptData)
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
    evaluation_attempt_id: number,
    evaluation_attempt_question_id: number,
    evaluation_option_id: number,
  ): Observable<IAnswerResponse> {
    const _payload = {
      evaluation_attempt_question: {
        question_option_id: evaluation_option_id,
      },
    };
    return this.http
      .put<IAnswerResponse>(
        `${environment.baseUrl}/api/v5/evaluation_attempts/${evaluation_attempt_id}/evaluation_attempt_questions/${evaluation_attempt_question_id}`,
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
      .put<IEvalAttempt>(`${environment.baseUrl}/api/v5/evaluation_attempts/${attempt_id}/submit`, {})
      .pipe(map(response => response['evaluation_attempt' as keyof object] as IEvalAttempt));
  }
}
