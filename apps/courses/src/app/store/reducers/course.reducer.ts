import { ICourseOverview } from '@cirrus/models';
import { createReducer, on } from '@ngrx/store';
import {
  fetchCourseOverview,
  fetchCourseOverviewFailure,
  fetchCourseOverviewSuccess,
} from '../actions/course.actions';

export interface CourseState {
  busy: boolean;
  error: unknown;
  courseOverview: ICourseOverview;
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
    hours_and_landings_stats: [],
    agreement_body: '',
    completion_time: undefined,
    course_content_stats: [],
    minimum_flight_hours: 0,
    certificate: { expiration: null },
    desktop_hero_image_url: '',
    mobile_hero_image_url: '',
    thumbnail_image_url: '',
    can_reenroll: false,
    lessons_stats: {
      completed: 0,
      total: 0,
    },
    progress: {
      id: 0,
      status: '',
    },
    summary_counts: {},
    stages: [],
    enrollments: [],
    next_lesson: {},
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
