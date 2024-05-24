import { InjectionToken, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RedeemComponent } from './components/redeem.component';
import { ActivatedRouteSnapshot, Route, RouterModule } from '@angular/router';
import { isAuthenticated } from '@cirrus/auth';
import { NoopComponent } from './noop.component';

const getResolvedUrl = (route: ActivatedRouteSnapshot): string => {
  const params = Object.keys(route.params)
    .map(k => `${k}=${route.params[k]}`)
    .join('&');
  const path = route.pathFromRoot.map(v => v.url.map(segment => segment.path).join('/')).join('/');
  return params.length > 0 ? `${path}?${params}` : path;
};

const coursesUrlProvider = new InjectionToken('coursesUrlRedirectResolver');

export const appRoutes: Route[] = [
  {
    matcher: url => {
      if (
        [
          'my-courses',
          'instructors',
          'instructor',
          'students',
          'course-catalog',
          'library',
          'reports',
          'help-center',
          'purchase-history',
          'ctc',
          'admin',
          'student-dashboard',
          'training-partners',
          'edit-profile',
          'recent-activity',
          'shopping-cart',
          'sign-in',
          'sign-out',
        ].includes(url[0].path)
      ) {
        return { consumed: url };
      }

      return null;
    },
    resolve: {
      url: coursesUrlProvider,
    },
    component: NoopComponent,
  },
  {
    path: '',
    redirectTo: 'redeem',
    pathMatch: 'full',
  },
  {
    path: 'redeem',
    component: AppComponent,
    children: [
      {
        path: ':code',
        component: RedeemComponent,
        canActivate: [isAuthenticated],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
  providers: [
    {
      provide: coursesUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        window.open(getResolvedUrl(route), '_self');
      },
    },
  ],
})
export class AppRoutingModule {}
