import { ICourseOveview } from '@cirrus/models';
import { createReducer, on } from '@ngrx/store';
import {
  fetchCourseOverview,
  fetchCourseOverviewFailure,
  fetchCourseOverviewSuccess,
} from '../actions/course.actions';

export interface CourseState {
  busy: boolean;
  error: any;
  courseOverview: ICourseOveview;
}

export const initialCourseState: CourseState = {
  busy: false,
  error: null,
  courseOverview: {
    id: 0,
    name: '',
    major_version: 0,
    minor_version: 0,
    title: '',
    subtitle: '',
    has_agreement: false,
    agreement_body: '',
    completion_time: undefined,
    minimum_flight_hours: 0,
    certificate: { expiration: null },
    desktop_hero_image_url: '',
    mobile_hero_image_url: '',
    can_reenroll: false,
    lessons_stats: {
      completed: 0,
      total: 0,
    },
    progress: {
      id: 0,
      status: '',
    },
    progress_stats: [],
    stages: [],
  },
};

export const reducer = createReducer(
  initialCourseState,
  on(fetchCourseOverview, state => ({ ...state, busy: true, error: null })),
  on(fetchCourseOverviewSuccess, (state, { courseOverview }) => ({
    busy: false,
    error: null,
    courseOverview,
  })),
  on(fetchCourseOverviewFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  }))
);
