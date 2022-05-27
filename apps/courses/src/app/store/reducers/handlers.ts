import {
  IProgressUpdateResponses,
  IProgress,
  IProgressUpdateResponse,
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
): LessonState => ({
  ...state,
  busy: false,
  error: null,
  lesson:
    responses.progresses.length &&
    responses.progresses.filter(p => p.progress_type === 'lesson')[0]
      ? {
          ...state.lesson,
          progress: {
            id: responses.progresses.filter(
              p => p.progress_type === 'lesson'
            )[0].id,
            status: responses.progresses.filter(
              p => p.progress_type === 'lesson'
            )[0].status,
          },
        }
      : state.lesson,
  lessonContents: responses.progresses.length
    ? handleLessonContentsProgressUpdate(
        responses.progresses,
        state.lessonContents
      )
    : state.lessonContents,
});
