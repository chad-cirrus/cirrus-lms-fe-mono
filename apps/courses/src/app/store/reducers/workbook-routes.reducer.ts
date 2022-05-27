import { IWorkBook } from '@cirrus/models';
import { createReducer, on } from '@ngrx/store';
import { completeProgressSuccess, startProgressSuccess } from '../actions';
import {
  fetchWorkbook,
  fetchWorkbookFailure,
  fetchWorkbookSuccess,
} from '../actions/workbook-routes.actions';
import { handleProgressSuccessInWorkbookReducer } from './workbook.handlers';

export interface WorkbookRoutesState {
  busy: boolean;
  error: any;
  workbook: IWorkBook;
}

const initialWorkbook: IWorkBook = {
  id: 0,
  progress: {
    id: 0,
    status: '',
  },
  name: '',
  stages: [],
};

export const initialWorkbookRoutesState: WorkbookRoutesState = {
  busy: false,
  error: null,
  workbook: initialWorkbook,
};

export const reducer = createReducer(
  initialWorkbookRoutesState,
  on(fetchWorkbook, state => ({ ...state, busy: true, error: null })),
  on(fetchWorkbookSuccess, (state, { workbook }) => ({
    busy: false,
    error: null,
    workbook,
  })),
  on(fetchWorkbookFailure, (state, { error }) => ({
    busy: false,
    workbook: initialWorkbook,
    error,
  })),
  on(startProgressSuccess, completeProgressSuccess, (state, { responses }) => {
    if (
      responses.progresses.filter(r => r.progress_type !== 'content').length ===
      0
    ) {
      return state;
    }

    return handleProgressSuccessInWorkbookReducer(state, responses);
  })
);

export const getWorkbook = (state: WorkbookRoutesState) => state.workbook;
export const getRoutesBusy = (state: WorkbookRoutesState) => state.busy;
export const getRoutesError = (state: WorkbookRoutesState) => state.error;
