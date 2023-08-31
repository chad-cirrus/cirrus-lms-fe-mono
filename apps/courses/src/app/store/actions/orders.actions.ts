import { IOrder } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const fetchOrders = createAction('fetch orders');

export const fetchOrdersSuccess = createAction('fetch orders success', props<{ order: IOrder }>());

export const fetchOrdersFailure = createAction('fetch orders failure', props<{ error: any }>());
