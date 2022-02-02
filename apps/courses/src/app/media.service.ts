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
}
