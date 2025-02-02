/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILesson } from '@cirrus/models';
import { createReducer, on } from '@ngrx/store';
import {
  completeProgress,
  completeProgressFailure,
  completeProgressSuccess,
  startProgress,
  startProgressFailure,
  startProgressSuccess,
} from '../actions';
import {
  fetchLessons,
  fetchLessonsFailure,
  fetchLessonsSuccess,
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
    updated_at: '',
    system_name: '',
    lesson_type: 0,
    title: '',
    overview: '',
    subtitle: '',
    thumbnail_image_url: '',
    mobile_hero_image_url: '',
    desktop_hero_image_url: '',
    is_archived: false,
    contents_are_linear: false,
    is_preview: false,
    major_version: 0,
    minor_version: 0,
    contents: [],
    order: 0,
    overview_image_url: '',
    student_intro_video: {
      content: {
        blob_directory: '',
        order: 0,
        evaluation: '',
        content_tasks: [],
        progress: { id: 1, status: 'not_completed' },
        content_file: '',
        content_filename: '',
        content_html: '',
        content_type: 0,
        created_by: 'Cirrus Aircraft',
        desc: 'Perspective & Perspective+ Avionics Course',
        id: 401,
        jet_scoring: false,
        meta_tags: [],
        placeholder_image:
          'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/5c480eb38443724475091bf0d91ba12.2.png',
        score: 0,
        show_comments: true,
        starter_file: '',
        subtitle: 'Hello Cockpit [2.1]',
        title: 'Hello Cockpit [2.1]',
        upload_image: '',
        url: '309005652',
      },
      content_id: 401,
      hidden: false,
      required: false,
      id: 1,
      title: '',
      updated_at: '',
      created_at: '',
    },
    instructor_intro_video: {
      content: {
        blob_directory: '',
        order: 0,
        evaluation: '',
        content_tasks: [],
        progress: { id: 1, status: 'not_completed' },
        content_file: '',
        content_filename: '',
        content_html: '',
        content_type: 0,
        created_by: '',
        desc: '',
        id: 0,
        jet_scoring: false,
        meta_tags: [],
        placeholder_image:
          'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/5c480eb38443724475091bf0d91ba12.2.png',
        score: 0,
        show_comments: true,
        starter_file: '',
        subtitle: '',
        title: '',
        upload_image: '',
        url: '',
      },
      content_id: 401,
      created_at: '2022-05-18T15:55:59.249Z',
      hidden: false,
      id: 69,
      required: false,
      title: 'hello',
      updated_at: '2022-05-18T15:55:59.249Z',
    },
    instructor_contents: [],
    instructor_overview: '',
    progress: {
      id: 0,
      status: '',
    },
    course_id: 0,
    course_attempt_id: 0,
    stage_id: 0,
    progress_stats: [],
  },
};

export const reducer = createReducer(
  initialLessonState,
  on(fetchLessons, state => ({ ...state, busy: true, error: null })),
  on(fetchLessonsSuccess, (state, { lesson }) => ({
    ...state,
    busy: false,
    error: null,
    lesson,
  })),
  on(fetchLessonsFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  })),
  on(startProgress, state => ({ ...state, busy: true, error: null })),
  on(startProgressSuccess, state => ({
    ...state,
    busy: true,
    error: null,
  })),
  on(startProgressFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  })),
  on(completeProgress, state => ({ ...state, busy: true, error: null })),
  on(completeProgressSuccess, state => ({
    ...state,
    busy: false,
  })),
  on(completeProgressFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  }))
);
