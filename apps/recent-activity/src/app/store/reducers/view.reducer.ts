import { createReducer, on } from '@ngrx/store';
import {
  setInstructorView,
  setScreenSize,
  setSideNavOpen,
} from '../actions/view.actions';

export interface ViewState {
  instructorView: boolean;
  sideNavOpen: boolean;
  screenSize: string;
}

export const initialViewState: ViewState = {
  instructorView: false,
  sideNavOpen: false,
  screenSize: '',
};

export const reducer = createReducer(
  initialViewState,
  on(setInstructorView, (state, { instructorView }) => ({
    ...state,
    instructorView,
  })),
  on(setSideNavOpen, (state, { sideNavOpen }) => ({ ...state, sideNavOpen })),
  on(setScreenSize, (state, { screenSize }) => ({ ...state, screenSize }))
);
