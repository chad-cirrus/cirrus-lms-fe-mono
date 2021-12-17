import { Injectable } from '@angular/core';
import { IWorkBookRoutes } from '@cirrus/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { CoursesService } from '../../course/course.service';
import {
  fetchWorkBookRoutes,
  fetchWorkBookRoutesFailure,
  fetchWorkBookRoutesSuccess,
} from '../actions/workbook-routes.actions';

@Injectable()
export class WorkbookRoutesEffects {
  fetchWorkBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWorkBookRoutes),
      mergeMap(({ courseId }) =>
        this.coursesService.getNavBarRoutes(courseId).pipe(
          map((routes: IWorkBookRoutes[]) =>
            fetchWorkBookRoutesSuccess({ routes })
          ),
          catchError(error => of(fetchWorkBookRoutesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
