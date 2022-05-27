import {
  IProgressUpdateResponses,
  IStage,
  IProgressUpdateResponse,
  IProgress,
} from '@cirrus/models';
import { WorkbookRoutesState } from './workbook-routes.reducer';

export const handleProgressSuccessInWorkbookReducer = (
  state: WorkbookRoutesState,
  responses: IProgressUpdateResponses
): WorkbookRoutesState => {
  if (!responses) {
    return state;
  }

  const courseUpdate = responses.progresses.filter(
    p => p.progress_type === 'course'
  )[0];

  const newWorkbookProgress: IProgress = courseUpdate
    ? {
        id: state.workbook.progress.id,
        status:
          state.workbook.progress.id === courseUpdate.id
            ? courseUpdate.status
            : state.workbook.progress.status,
      }
    : {
        ...state.workbook.progress,
      };

  const lessonUpdate = responses.progresses.filter(
    p => p.progress_type === 'lesson'
  )[0];

  const stageUpdate = responses.progresses.filter(
    p => p.progress_type === 'stage'
  )[0];

  const newStages: IStage[] =
    lessonUpdate && stageUpdate
      ? updateStages(state.workbook.stages, stageUpdate, lessonUpdate)
      : lessonUpdate
      ? updateStageLesson(state, lessonUpdate)
      : {
          ...state.workbook.stages,
        };

  return {
    ...state,
    workbook: {
      ...state.workbook,
      progress: newWorkbookProgress,
      stages: newStages,
    },
  };
};

function updateStageLesson(
  state: WorkbookRoutesState,
  lessonUpdate: IProgressUpdateResponse
) {
  return state.workbook.stages.map(stage => ({
    ...stage,
    lessons: stage.lessons.map(lesson => ({
      ...lesson,
      progress:
        lesson.progress.id === lessonUpdate.id
          ? { id: lessonUpdate.id, status: lessonUpdate.status }
          : { ...lesson.progress },
    })),
  }));
}

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
