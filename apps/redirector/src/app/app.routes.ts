import { AppComponent } from './app.component';
import { RedeemComponent } from './components/redeem.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'redemption/:code/redeem',
    component: RedeemComponent,
  }
];
