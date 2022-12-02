import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class UiDownloadService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly environment: Record<string, unknown>;
  private loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();

  private certificateLoadingSubject = new BehaviorSubject(false);
  certificateLoading$ = this.certificateLoadingSubject.asObservable();

  private transcriptLoadingSubject = new BehaviorSubject(false);
  transcriptloading$ = this.transcriptLoadingSubject.asObservable();

  private selectedIdSubject = new BehaviorSubject(0);
  selectedCourseAttemptId$ = this.selectedIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  setSelectedId(value: number) {
    this.selectedIdSubject.next(value);
  }

  downloadCertificate(course_attempt_id: number) {
    const url = `${this.environment['baseUrl']}/api/v4/pdf/certificate`;
    const queryParams = { course_attempt_id };
    return of(null).pipe(
      tap(() => this.certificateLoadingSubject.next(true)),
      concatMap(() =>
        this.http.get(url, { params: queryParams, responseType: 'blob' })
      ),
      finalize(() => this.certificateLoadingSubject.next(false))
    );
  }

  downloadTranscript(course_id: number) {
    const url = `${this.environment['baseUrl']}/api/v4/courses/${course_id}/transcript.pdf`;
    return of(null).pipe(
      tap(() => this.transcriptLoadingSubject.next(true)),
      concatMap(() => this.http.get(url, { responseType: 'blob' })),
      finalize(() => this.transcriptLoadingSubject.next(false))
    );
  }

  courseReEnroll(payload: ReEnrollPayload) {
    const { course_id, user_id } = payload;
    return this.http.post(
      `${this.environment.baseUrl}/api/v3/courses/reenroll/${course_id}/${user_id}`,
      {}
    );
  }
}

interface ReEnrollPayload {
  course_id: number;
  user_id: number;
}
