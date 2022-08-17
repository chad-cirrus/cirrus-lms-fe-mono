import { Injectable } from '@angular/core';
import { ILesson } from '@cirrus/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { CoursesService } from '../../course/course.service';
import {
  fetchLessons,
  fetchLessonsFailure,
  fetchLessonsSuccess,
} from '../actions';
import {
  fetchCourseOverview,
  fetchCourseOverviewFailure,
  fetchCourseOverviewSuccess,
} from '../actions/course.actions';

@Injectable()
export class LessonsEffects {
  fetchLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLessons),
      mergeMap(({ courseId, lessonId }) =>
        this.coursesService.getLessons(courseId, lessonId).pipe(
          map((lesson: ILesson) => fetchLessonsSuccess({ lesson })),
          catchError(error => of(fetchLessonsFailure({ error })))
        )
      )
    )
  );

  fetchCourseOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCourseOverview),
      mergeMap(({ courseId }) =>
        this.coursesService.getCourseOverview(courseId).pipe(
          map(courseOverview => fetchCourseOverviewSuccess({ courseOverview })),
          catchError(error => of(fetchCourseOverviewFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
