import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface ScormResponse {
  initialFile: URL;
}

@Injectable()
export class MediaServerService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  scormStartingUrl(unitName: string | null | undefined): Observable<URL> {
    const url = `${environment.baseUrl}/scorm/${unitName}`;
    return this.http
      .get<ScormResponse>(url)
      .pipe(map(response => response.initialFile));
  }

  updateScormProgress(progress_id: number, token: string) {
    const url = `${environment.baseUrl}/api/v4/progresses/${progress_id}`;
    const payload = { scorm_progress: token };
    console.log('payload', payload);
    return this.http.patch(url, payload);
  }
}
