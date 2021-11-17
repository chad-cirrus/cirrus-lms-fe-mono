import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { AppService } from '../../app.service';
import {
  fetchConfig,
  fetchConfigFailure,
  fetchConfigSuccess,
} from '../actions';

@Injectable()
export class ConfigEffects {
  fetchConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchConfig),
      mergeMap(() =>
        this.appsService.getConfigs().pipe(
          map(configs => fetchConfigSuccess({ configs })),
          catchError(error => of(fetchConfigFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private appsService: AppService) {}
}
