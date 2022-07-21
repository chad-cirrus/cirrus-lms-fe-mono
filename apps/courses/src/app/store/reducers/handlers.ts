import {
  IProgressUpdateResponses,
  IProgress,
  IProgressUpdateResponse, ILesson,
} from '@cirrus/models';
import {
  LessonContentsState,
  lessonContentsEntityAdapter,
  LessonState,
} from './lesson.reducer';

export const handleUpdateLessonProgress = ({
  progresses,
}: IProgressUpdateResponses): IProgress => {
  const { id, status } = progresses.filter(
    p => p.progressable_type === 'Lesson'
  )[0];
  return { id, status };
};

export const handleLessonContentsProgressUpdate = (
  progresses: IProgressUpdateResponse[],
  state: LessonContentsState
): LessonContentsState => {
  const { item_id, id, status } = progresses.filter(
    p => p.progress_type === 'content'
  )[0];
  return lessonContentsEntityAdapter.updateOne(
    {
      id: item_id,
      changes: {
        progress: {
          id,
          status,
        },
      },
    },
    state
  );
};

export const handleStartProgressSuccess = (
  state: LessonState,
  responses: IProgressUpdateResponses
): LessonState => ({
  ...state,
  lesson: {
    ...state.lesson,
    progress: responses.progresses.filter(
      p => p.progressable_type === 'Lesson'
    )[0]
      ? handleUpdateLessonProgress(responses)
      : state.lesson.progress,
  },
  busy: false,
  error: null,
  lessonContents: responses.progresses.filter(
    p => p.progress_type === 'content'
  )[0]
    ? handleLessonContentsProgressUpdate(
        responses.progresses,
        state.lessonContents
      )
    : state.lessonContents,
});

export const handleCompleteProgressSuccess = (
  state: LessonState,
  responses: IProgressUpdateResponses
): LessonState => {
  let lessonProgress: IProgressUpdateResponse | IProgress;
  let lesson: ILesson = { ...state.lesson, progress_stats: responses.progress_stats };
  if(responses.progresses.length) {
    lessonProgress = responses.progresses.filter(p => p.progress_type === 'lesson').pop() || state.lesson.progress;

    lesson = {
      ...lesson,
      progress: {
        id: lessonProgress.id,
        status: lessonProgress.status,
      },
    };
  }

  return {
    ...state,
    busy: false,
    error: null,
    lesson,
    lessonContents: responses.progresses.length
      ? handleLessonContentsProgressUpdate(
          responses.progresses,
          state.lessonContents
        )
      : state.lessonContents,
  }
};
