import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/redeem/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedemptionCodesService {
  private readonly environment;

  constructor(private http: HttpClient) {
    this.environment = environment;
  }

  redeemCode(code: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('cirrus-token'),
      }),
    };
    return this.http.post(`${this.environment.baseUrl}/api/v5/redemption_codes/${code}/redeem`, {}, httpOptions);
  }
}
