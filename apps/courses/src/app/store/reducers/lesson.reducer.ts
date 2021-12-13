import { ILesson } from '@cirrus/models';
import { createReducer, on } from '@ngrx/store';
import { fetchConfigFailure } from '../actions';
import {
  fetchLessons,
  fetchLessonsSuccess,
  fetchLessonsFailure,
} from '../actions/lessons.actions';

export interface LessonState {
  busy: boolean;
  error: any;
  lesson: ILesson;
}

export interface LessonPartialState {
  readonly lesson: LessonState;
}

export const initialLessonState: LessonState = {
  busy: false,
  error: null,
  lesson: {
    id: 0,
    system_desc: '',
    created_at: '',
    updated_at: '',
    system_name: '',
    lesson_type: 0,
    title: '',
    overview: '',
    is_archived: false,
    contents_are_linear: false,
    is_preview: false,
    major_version: 0,
    minor_version: 0,
    contents: [],
  },
};

export const reducer = createReducer(
  initialLessonState,
  on(fetchLessons, state => ({ ...state, busy: true, error: null })),
  on(fetchLessonsSuccess, (state, { lesson }) => ({
    busy: false,
    error: null,
    lesson,
  })),
  on(fetchLessonsFailure, (state, { error }) => ({
    ...initialLessonState,
    error,
  }))
);
