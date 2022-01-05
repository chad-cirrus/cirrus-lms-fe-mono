import { createReducer, on } from '@ngrx/store';
import { setInstructorView } from '../actions/view.actions';

export interface ViewState {
  instructorView: boolean;
}

export const initialViewState: ViewState = {
  instructorView: false,
};

export const reducer = createReducer(
  initialViewState,
  on(setInstructorView, (state, { instructorView }) => ({
    ...state,
    instructorView,
  }))
);
