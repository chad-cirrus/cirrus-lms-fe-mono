import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RedeemComponent } from './components/redeem.component';
import { Route, RouterModule } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'redirect',
    pathMatch: 'full'
  },
  {
    path: 'redirect',
    component: AppComponent,
    children: [
      {
        path: 'redemption/:code/redeem',
        component: RedeemComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
