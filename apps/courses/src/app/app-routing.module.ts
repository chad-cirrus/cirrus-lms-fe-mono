import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { isAuthenticated } from '@cirrus/auth';
import { CourseEnrollmentComponent } from './course-enrollment/course-enrollment.component';
import { CourseEnrollmentsRouteComponent } from './course/course-enrollments-route/course-enrollments-route.component';
import { CourseLessonsRouteComponent } from './course/course-lessons-route/course-lessons-route.component';
import { CourseOverviewRouteComponent } from './course/course-overview-route/course-overview-route.component';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './course/lesson/lesson.component';
import { NextLessonRedirectComponent } from './next-lesson-redirect/next-lesson-redirect.component';
import { NoopComponent } from './shared/noop/noop.component';

const getResolvedUrl = (route: ActivatedRouteSnapshot): string => {
  const params = Object.keys(route.params)
    .map(k => `${k}=${route.params[k]}`)
    .join('&');
  const path = route.pathFromRoot.map(v => v.url.map(segment => segment.path).join('/')).join('/');
  console.log('path', path, 'params', params);
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
    path: 'courses/:courseId',
    component: CourseComponent,
    children: [
      { path: 'overview', component: CourseOverviewRouteComponent },
      { path: 'lessons', component: CourseLessonsRouteComponent },
      { path: 'enrollments', component: CourseEnrollmentsRouteComponent },
      {
        path: 'enroll',
        component: CourseEnrollmentComponent,
        canActivate: [isAuthenticated],
      },
    ],
  },
  {
    path: 'courses/:courseId/next-lesson',
    component: NextLessonRedirectComponent,
  },
  {
    path: 'courses/:courseId/stages/:stageId/lessons/:lessonId',
    component: LessonComponent,
  },
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
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule],
})
export class AppRoutingModule {}
