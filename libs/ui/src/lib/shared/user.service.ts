import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IOrder } from '@cirrus/models';

@Injectable()
export class UserService {
  private environment!: Record<string, unknown>;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('environment') environment: Record<string, unknown>
  ) {
    this.environment = environment;
  }
  logout() {
    localStorage.setItem('cirrus-signout', 'true');
    this.router.navigate(['/sign-out']);
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

  getMyOrders() {
    return this.http.get<IOrder>(
      `${this.environment.baseUrl}/api/v3/orders/my-orders`
    );
  }
}
