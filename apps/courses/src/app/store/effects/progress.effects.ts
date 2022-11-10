import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { CoursesService } from '../../course/course.service';
import {
  completeProgress,
  completeProgressFailure,
  fetchLessons,
  startProgress,
  startProgressFailure,
} from '../actions';
import { fetchCourseOverview } from '../actions/course.actions';

@Injectable()
export class ProgressEffects {
  startProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startProgress),
      mergeMap(({ id, courseId, stageId, lessonId }) =>
        this.coursesService.startProgress(id).pipe(
          switchMap(() => [
            fetchCourseOverview({ courseId }),
            fetchLessons({ courseId, stageId, lessonId }),
          ]),
          catchError(error => of(startProgressFailure({ error })))
        )
      )
    )
  );

  completeProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeProgress),
      mergeMap(({ id, courseId, stageId, lessonId, progress }) =>
        this.coursesService.completeProgress(id, progress).pipe(
          switchMap(() => [
            fetchCourseOverview({ courseId }),
            fetchLessons({ courseId, stageId, lessonId }),
          ]),
          catchError(error => of(completeProgressFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
