import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecentActivityComponent } from '../../../../libs/ui/src/lib/recent-activity/recent-activity.component';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './course/lesson/lesson.component';
import { NoopComponent } from './shared/noop/noop.component';

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
          'instructors',
          'my-students',
          'course-catalog',
          'library',
          'reports',
          'help-center',
          'purchase-history',
          'ctc-dashboard',
          'admin-dashboard',
          'student-dashboard',
          'instructor-dashboard',
          'edit-profile'
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
  { path: 'courses/recent-activity', component: RecentActivityComponent },
  {
    path: 'courses/:courseId',
    component: CourseComponent,
    children: [],
  },
  { path: 'courses/:courseId/lessons/:lessonId', component: LessonComponent },
];

@NgModule({
  providers: [
    {
      provide: coursesUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        window.open(getResolvedUrl(route), '_self');
      },
    },
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
