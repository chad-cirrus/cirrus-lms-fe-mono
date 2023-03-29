import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class FeatureResponse {
  enabled!: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private readonly environment: Record<string, unknown>;

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }

  isFeatureEnabled(featureName: string): Observable<boolean> {
    const url = `${this.environment['baseUrl']}/api/v4/features/${featureName}`;
    return this.http
      .get<FeatureResponse>(url)
      .pipe(map(feature => feature.enabled));
  }
}
