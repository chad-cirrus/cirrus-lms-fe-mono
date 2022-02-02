import { createReducer, on } from '@ngrx/store';
import { setInstructorView, setSideNavOpen } from '../actions/view.actions';

export interface ViewState {
  instructorView: boolean;
  sideNavOpen: boolean;
}

export const initialViewState: ViewState = {
  instructorView: false,
  sideNavOpen: false,
};

export const reducer = createReducer(
  initialViewState,
  on(setInstructorView, (state, { instructorView }) => ({
    ...state,
    instructorView,
  })),
  on(setSideNavOpen, (state, { sideNavOpen }) => ({ ...state, sideNavOpen }))
);
