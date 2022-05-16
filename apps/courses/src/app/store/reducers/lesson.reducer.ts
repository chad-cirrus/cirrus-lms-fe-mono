import { IContent, ILesson } from '@cirrus/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
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
  fetchLessonsSuccess,
  fetchLessonsFailure,
} from '../actions/lessons.actions';
import {
  handleStartProgressSuccess,
  handleCompleteProgressSuccess,
} from './handlers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LessonContentsState extends EntityState<IContent> {}

export const lessonContentsEntityAdapter: EntityAdapter<IContent> =
  createEntityAdapter<IContent>();

export const initialContents = lessonContentsEntityAdapter.getInitialState();
export interface LessonState {
  busy: boolean;
  error: any;
  lesson: ILesson;
  lessonContents: LessonContentsState;
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
    is_archived: false,
    contents_are_linear: false,
    is_preview: false,
    major_version: 0,
    minor_version: 0,
    contents: [],
    order: 0,
    overview_image_url: '',
    student_intro_video: '',
    instructor_intro_video: '',
    instructor_contents: [],
    instructor_overview: '',
    progress: {
      id: 0,
      status: '',
    },
    course_id: 0,
    course_attempt_id: 0,
    stage_id: 0,
  },
  lessonContents: lessonContentsEntityAdapter.getInitialState(),
};

export const reducer = createReducer(
  initialLessonState,
  on(fetchLessons, state => ({ ...state, busy: true, error: null })),
  on(fetchLessonsSuccess, (state, { lesson }) => ({
    ...state,
    busy: false,
    error: null,
    lesson: {
      ...lesson,
      contents: [],
    },
    lessonContents: lessonContentsEntityAdapter.setAll(
      lesson.contents,
      state.lessonContents
    ),
  })),
  on(fetchLessonsFailure, ({ error }) => ({
    ...initialLessonState,
    error,
  })),
  on(startProgress, state => ({ ...state, busy: true, error: null })),
  on(startProgressSuccess, (state, { responses }) =>
    handleStartProgressSuccess(state, responses)
  ),
  on(startProgressFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  })),
  on(completeProgress, state => ({ ...state, busy: true, error: null })),
  on(completeProgressSuccess, (state, { responses }) =>
    handleCompleteProgressSuccess(state, responses)
  ),
  on(completeProgressFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  }))
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  lessonContentsEntityAdapter.getSelectors();

export const selectLessonContentIds = selectIds;
export const selectLessonContentEntities = selectEntities;
export const selectAllLessonContents = selectAll;
export const selectTotalLessonContents = selectTotal;
