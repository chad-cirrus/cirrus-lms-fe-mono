import { IWorkBookRoutes } from '@cirrus/models';
import { createReducer, on } from '@ngrx/store';
import {
  fetchWorkBookRoutes,
  fetchWorkBookRoutesFailure,
  fetchWorkBookRoutesSuccess,
} from '../actions/workbook-routes.actions';

export interface WorkbookRoutesState {
  busy: boolean;
  error: any;
  routes: IWorkBookRoutes[];
}

export const initialWorkbookRoutesState: WorkbookRoutesState = {
  busy: false,
  error: null,
  routes: [],
};

export const reducer = createReducer(
  initialWorkbookRoutesState,
  on(fetchWorkBookRoutes, state => ({ ...state, busy: true, error: null })),
  on(fetchWorkBookRoutesSuccess, (state, { routes }) => ({
    busy: false,
    error: null,
    routes,
  })),
  on(fetchWorkBookRoutesFailure, (state, { error }) => ({
    busy: false,
    routes: [],
    error,
  }))
);

export const getRoutes = (state: WorkbookRoutesState) => state.routes;
export const getRoutesBusy = (state: WorkbookRoutesState) => state.busy;
export const getRoutesError = (state: WorkbookRoutesState) => state.error;
