import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICourseOverview, IOrder } from '@cirrus/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  selectedRowId$ = this.selectedIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  setSelectedId(value: number) {
    this.selectedIdSubject.next(value);
  }

  getCourse(course_id: number): Observable<any> {
    const url = `${this.environment['baseUrl']}/api/v4/courses/${course_id}}`;
    return this.http.get(url);
  }

  downloadCertificate(user_certificate_id: number) {
    const url = `${this.environment['baseUrl']}/api/v4/user_certificates/${user_certificate_id}`;
    return of(null).pipe(
      tap(() => this.certificateLoadingSubject.next(true)),
      concatMap(() => this.http.get(url, { responseType: 'blob' })),
      finalize(() => this.certificateLoadingSubject.next(false))
    );
  }

  downloadTranscript(course_id: number, course_attempt_id: number) {
    const param =
      course_attempt_id > 0 ? `?course_attempt_id=${course_attempt_id}` : '';
    const url =
      `${this.environment['baseUrl']}/api/v4/courses/${course_id}/transcript.pdf` +
      param;
    return of(null).pipe(
      tap(() => this.transcriptLoadingSubject.next(true)),
      concatMap(() => this.http.get(url, { responseType: 'blob' })),
      finalize(() => this.transcriptLoadingSubject.next(false))
    );
  }
}
