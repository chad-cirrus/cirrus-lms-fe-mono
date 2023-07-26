import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  fetchOrders,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from '../actions/orders.actions';
import { AppService } from '../../app.service';

@Injectable()
export class OrderEffects {
  fetchOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOrders),
      mergeMap(action =>
        this.appService.getMyOrders().pipe(
          map(order => fetchOrdersSuccess({ order })),
          catchError(error => of(fetchOrdersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private appService: AppService) {}
}
