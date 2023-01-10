import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { CoursesService } from '../../course/course.service';
import {
  completeProgress,
  completeProgressFailure,
  fetchLessons,
  fetchLessonsWithoutTasksLogbook,
  startProgress,
  startProgressFailure,
} from '../actions';
import { fetchCourseOverview } from '../actions/course.actions';
import { nullProgressUpdateResponses } from '@cirrus/models';

@Injectable()
export class ProgressEffects {
  startProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startProgress),
      mergeMap(({ id, courseId, stageId, lessonId, assessment }) =>
        this.coursesService.startProgress(id).pipe(
          switchMap(() => [
            fetchCourseOverview({ courseId }),
            assessment
              ? fetchLessons({ courseId, stageId, lessonId })
              : fetchLessonsWithoutTasksLogbook({ courseId, stageId, lessonId }),
          ]),
          catchError(error => of(startProgressFailure({ error })))
        )
      )
    )
  );

  completeProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeProgress),
      mergeMap(({ id, courseId, stageId, lessonId, progress, assessment }) =>
        this.coursesService.completeProgress(id, progress).pipe(
          switchMap(() => [
            fetchCourseOverview({ courseId }),
            assessment
              ? fetchLessons({ courseId, stageId, lessonId })
              : fetchLessonsWithoutTasksLogbook({ courseId, stageId, lessonId }),
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
