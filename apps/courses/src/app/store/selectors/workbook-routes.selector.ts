import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkbookRoutesState } from '../reducers/workbook-routes.reducer';
import * as fromReducer from '../reducers/workbook-routes.reducer';

export const selectWorkbookRoutesFeature =
  createFeatureSelector<WorkbookRoutesState>('routes');

export const selectWorkBookRoutes = createSelector(
  selectWorkbookRoutesFeature,
  fromReducer.getRoutes
);

export const selectWorkbookRoutesBusy = createSelector(
  selectWorkbookRoutesFeature,
  fromReducer.getRoutesBusy
);
