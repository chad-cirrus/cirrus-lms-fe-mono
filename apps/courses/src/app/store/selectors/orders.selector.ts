import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromOrder from '../reducers/order.reducer';

export const selectOrderState = (state: AppState) => state.order;

export const selectOrder = createFeatureSelector<fromOrder.OrderState>('order');

export const selectOrders = createSelector(
  selectOrderState,
  state => state.order
);
