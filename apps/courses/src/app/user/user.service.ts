import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  logout() {
    const url = `${environment.baseUrl}/api/v3/users/sign_out/`;
    return this.http.post<any>(url, {})
  }
}
