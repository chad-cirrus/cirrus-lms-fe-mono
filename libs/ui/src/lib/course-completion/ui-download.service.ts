import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class UiDownloadService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private environment: Record<string, unknown>;

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  downloadCertificate(course_attempt_id: number) {
    const url = `${this.environment['baseUrl']}/api/v4/pdf/certificate`;
    const queryParams = { course_attempt_id };
    return this.http
      .get(url, { params: queryParams, responseType: 'blob' })
      .pipe();
  }
}
