import { createReducer, on } from '@ngrx/store';
import { setInstructorView, setSideNavOpen, setIsScreenSmall, setIsScreenTablet } from '../actions/view.actions';

export interface ViewState {
  instructorView: boolean;
  sideNavOpen: boolean;
  isScreenSmall: boolean;
  isScreenTablet: boolean;
}

export const initialViewState: ViewState = {
  instructorView: false,
  sideNavOpen: false,
  isScreenSmall: false,
  isScreenTablet: false
};

export const reducer = createReducer(
  initialViewState,
  on(setInstructorView, (state, { instructorView }) => ({
    ...state,
    instructorView,
  })),
  on(setSideNavOpen, (state, { sideNavOpen }) => ({ ...state, sideNavOpen })),
  on(setIsScreenSmall, (state, { isScreenSmall }) => ({ ...state, isScreenSmall }) ),
  on(setIsScreenTablet, (state, { isScreenTablet }) => ({ ...state, isScreenTablet }) )

);
