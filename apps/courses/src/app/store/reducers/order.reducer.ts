import { createReducer, on } from '@ngrx/store';
import {
  fetchOrders,
  fetchOrdersFailure,
  fetchOrdersSuccess,
} from '../actions/orders.actions';
import { IOrder } from '@cirrus/models';
import { mockOrder } from '../../course/testData';

export interface OrderState {
  busy: boolean;
  error: unknown;
  order: IOrder;
}

export const initialOrderState: OrderState = {
  busy: false,
  error: null,
  order: mockOrder,
};

export const reducer = createReducer(
  initialOrderState,
  on(fetchOrders, state => ({
    ...state,
    busy: true,
  })),
  on(fetchOrdersSuccess, (state, { order }) => ({
    ...state,
    busy: false,
    order: order,
    error: null,
  })),
  on(fetchOrdersFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error: error,
  }))
);
