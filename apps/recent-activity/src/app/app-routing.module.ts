import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { NoopComponent } from './components/noop/noop.component';
import { AchievementsPageComponent } from './components/achievements-page/achievements-page.component';

const getResolvedUrl = (route: ActivatedRouteSnapshot): string => {
  const params = Object.keys(route.params)
    .map(k => `${k}=${route.params[k]}`)
    .join('&');
  const path = route.pathFromRoot
    .map(v => v.url.map(segment => segment.path).join('/'))
    .join('/');
  return params.length > 0 ? `${path}?${params}` : path;
};

const coursesUrlProvider = new InjectionToken('coursesUrlRedirectResolver');

const routes: Routes = [
  {
    matcher: url => {
      if (
        [
          'my-courses',
          'courses',
          'instructors',
          'instructor',
          'my-students',
          'course-catalog',
          'learning-catalog',
          'library',
          'reports',
          'help-center',
          'purchase-history',
          'ctc',
          'admin',
          'student-dashboard',
          'training-partners',
          'edit-profile',
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
  { path: 'recent-activity', component: RecentActivityComponent },
  {
    path: 'recent-activity/achievements',
    component: AchievementsPageComponent,
  },
  { path: '', redirectTo: 'recent', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
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
