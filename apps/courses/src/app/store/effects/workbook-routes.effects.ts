import { Injectable } from '@angular/core';
import { IWorkBook } from '@cirrus/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { CoursesService } from '../../course/course.service';
import {
  fetchWorkbook,
  fetchWorkbookFailure,
  fetchWorkbookSuccess,
} from '../actions/workbook-routes.actions';

@Injectable()
export class WorkbookRoutesEffects {
  fetchWorkBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWorkbook),
      mergeMap(({ courseId }) =>
        this.coursesService.getWorkbook(courseId).pipe(
          map((workbook: IWorkBook) => fetchWorkbookSuccess({ workbook })),
          catchError(error => of(fetchWorkbookFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
