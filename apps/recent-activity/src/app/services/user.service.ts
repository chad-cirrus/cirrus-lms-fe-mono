import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  logout() {
    const url = `${environment.baseUrl}/api/v3/users/sign_out/`;
    return this.http.post<any>(url, {});
  }

  impersonationLogout() {
    localStorage.setItem(
      'cirrus-token',
      localStorage.getItem('cirrus-impersonation-return') ?? ''
    );
    localStorage.setItem(
      'cirrus-user',
      localStorage.getItem('cirrus-impersonation-return-user') ?? ''
    );
    localStorage.setItem(
      'cirrus-role',
      localStorage.getItem('cirrus-impersonation-return-role') ?? ''
    );

    localStorage.removeItem('cirrus-impersonation-return-role');
    localStorage.removeItem('cirrus-impersonation-return');
    localStorage.removeItem('cirrus-impersonation-return-user');

    this.router.navigate(['admin']);
  }
}
