import { createReducer, on } from '@ngrx/store';
import { setInstructorView, setSideNavOpen, setIsScreenSmall } from '../actions/view.actions';

export interface ViewState {
  instructorView: boolean;
  sideNavOpen: boolean;
  isScreenSmall: boolean;
}

export const initialViewState: ViewState = {
  instructorView: false,
  sideNavOpen: false,
  isScreenSmall: false
};

export const reducer = createReducer(
  initialViewState,
  on(setInstructorView, (state, { instructorView }) => ({
    ...state,
    instructorView,
  })),
  on(setSideNavOpen, (state, { sideNavOpen }) => ({ ...state, sideNavOpen })),
  on(setIsScreenSmall, (state, { isScreenSmall }) => ({ ...state, isScreenSmall }) )
);
