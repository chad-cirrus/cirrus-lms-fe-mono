import {
  IProgressUpdateResponses,
  IProgress,
  IStage,
  IProgressUpdateResponse,
} from '@cirrus/models';
import {
  LessonContentsState,
  lessonContentsEntityAdapter,
  LessonState,
} from './lesson.reducer';
import { WorkbookRoutesState } from './workbook-routes.reducer';

export const handleUpdateLessonProgress = ({
  progresses,
}: IProgressUpdateResponses): IProgress => {
  const { id, status } = progresses.filter(
    p => p.progressable_type === 'Lesson'
  )[0];
  return { id, status };
};

export const handleLessonContentsProgressUpdate = (
  { progresses }: IProgressUpdateResponses,
  state: LessonContentsState
): LessonContentsState => {
  const { item_id, id, status } = progresses.filter(
    p => p.progressable_type === 'Content'
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
    progress: handleUpdateLessonProgress(responses),
  },
  busy: false,
  error: null,
  lessonContents: handleLessonContentsProgressUpdate(
    responses,
    state.lessonContents
  ),
});

export const handleCompleteProgressSuccess = (
  state: LessonState,
  responses: IProgressUpdateResponses
): LessonState => ({
  ...state,
  busy: false,
  error: null,
  lessonContents: handleLessonContentsProgressUpdate(
    responses,
    state.lessonContents
  ),
});

export const handleStartProgressSuccessInWorkbookReduer = (
  state: WorkbookRoutesState,
  responses: IProgressUpdateResponses
): WorkbookRoutesState => {
  const stageUpdate = responses.progresses.filter(
    p => p.progress_type === 'stage'
  )[0];

  const lessonUpdate = responses.progresses.filter(
    p => p.progress_type === 'lesson'
  )[0];

  return {
    ...state,
    workbook: {
      ...state.workbook,
      stages: updateStages(state.workbook.stages, stageUpdate, lessonUpdate),
    },
  };
};

export const handleCompleteProgressSuccessInWorkbookReduer = (
  state: WorkbookRoutesState,
  responses: IProgressUpdateResponses
): WorkbookRoutesState => {
  const lessonUpdate = responses.progresses.filter(
    p => p.progress_type === 'lesson'
  )[0];

  if (lessonUpdate) {
    return {
      ...state,
      workbook: {
        ...state.workbook,
        stages: state.workbook.stages.map(stage => ({
          ...stage,
          lessons: stage.lessons.map(lesson => ({
            ...lesson,
            progress:
              lesson.progress.id === lessonUpdate.id
                ? { id: lessonUpdate.id, status: lessonUpdate.status }
                : lesson.progress,
          })),
        })),
      },
    };
  } else {
    return state;
  }
};

function updateStages(
  stages: IStage[],
  stageUpdate: IProgressUpdateResponse,
  lessonUpdate: IProgressUpdateResponse
): IStage[] {
  return stages.map(stage => ({
    ...stage,
    progress:
      stage.progress.id === stageUpdate.id
        ? { id: stageUpdate.id, status: stageUpdate.status }
        : stage.progress,
    lessons: stage.lessons.map(lesson => ({
      ...lesson,
      progress:
        lesson.progress.id === lessonUpdate.id
          ? { id: lessonUpdate.id, status: lessonUpdate.status }
          : lesson.progress,
    })),
  }));
}
