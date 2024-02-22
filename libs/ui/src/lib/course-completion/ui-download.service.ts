import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PdfDownloadFile } from '@cirrus/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap, map } from 'rxjs/operators';

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

  downloadCertificate(user_certificate_id: number): Observable<PdfDownloadFile> {
    const url = `${this.environment['baseUrl']}/api/v4/user_certificates/${user_certificate_id}`;

    return of(null).pipe(
      tap(() => this.certificateLoadingSubject.next(true)),
      concatMap(() => this.http.get(url, { observe: 'response', responseType: 'blob' })),
      map(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const name = this.parseFilename(contentDisposition as string);
        const newPdfFile: PdfDownloadFile = {
          filename: name,
          file: response.body as Blob
        }

        return newPdfFile;
      }),
      finalize(() => this.certificateLoadingSubject.next(false))
    );
  }

  downloadTranscript(course_id: number, course_attempt_id: number): Observable<PdfDownloadFile> {
    const param =
      course_attempt_id > 0 ? `?course_attempt_id=${course_attempt_id}` : '';
    const url =
      `${this.environment['baseUrl']}/api/v4/courses/${course_id}/transcript.pdf` +
      param;

    return of(null).pipe(
      tap(() => this.transcriptLoadingSubject.next(true)),
      concatMap(() => this.http.get(url, { observe: 'response', responseType: 'blob' })),
      map(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const name = this.parseFilename(contentDisposition as string);
        const newPdfFile: PdfDownloadFile = {
          filename: name,
          file: response.body as Blob
        }

        return newPdfFile;
      }),
      finalize(() => this.transcriptLoadingSubject.next(false))
    );
  }

  parseFilename(contentDisposition: string): string {
    const filenameStarRegex = /filename\*=UTF-8''([^;]+)/;
    const matchesStar = filenameStarRegex.exec(contentDisposition);
    if (matchesStar && matchesStar[1]) {
      return decodeURIComponent(matchesStar[1]);
    }

    const filenameRegex = /filename="([^"]+)"/;
    const matches = filenameRegex.exec(contentDisposition);
    if (matches && matches[1]) {
      return matches[1];
    }

    return '';
  }
}
