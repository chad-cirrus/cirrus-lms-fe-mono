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

@Injectable()
export class LessonsEffects {
  fetchLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLessons),
      mergeMap(({ lessonId }) =>
        this.coursesService.getLessons(lessonId).pipe(
          map((lesson: ILesson) => fetchLessonsSuccess({ lesson })),
          catchError(error => of(fetchLessonsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
