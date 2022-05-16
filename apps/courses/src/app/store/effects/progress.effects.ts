import { Injectable } from '@angular/core';
import { IProgressUpdateResponses } from '@cirrus/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { CoursesService } from '../../course/course.service';
import {
  completeProgress,
  completeProgressFailure,
  completeProgressSuccess,
  startProgress,
  startProgressFailure,
  startProgressSuccess,
} from '../actions';

@Injectable()
export class ProgressEffects {
  startProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startProgress),
      mergeMap(({ id }) =>
        this.coursesService.startProgress(id).pipe(
          map((responses: IProgressUpdateResponses) =>
            startProgressSuccess({ responses })
          ),
          catchError(error => of(startProgressFailure({ error })))
        )
      )
    )
  );

  completeProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeProgress),
      mergeMap(({ id }) =>
        this.coursesService.completeProgress(id).pipe(
          map((responses: IProgressUpdateResponses) =>
            completeProgressSuccess({ responses })
          ),
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
