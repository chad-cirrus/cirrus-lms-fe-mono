import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class UiDownloadService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private environment: Record<string, unknown>;
  private loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  downloadCertificate(course_attempt_id: number) {
    const url = `${this.environment['baseUrl']}/api/v4/pdf/certificate`;
    const queryParams = { course_attempt_id };
    return of(null).pipe(
      tap(() => this.loadingSubject.next(true)),
      concatMap(() =>
        this.http.get(url, { params: queryParams, responseType: 'blob' })
      ),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
