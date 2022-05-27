import {
  IProgressUpdateResponse,
  PROGRESS_STATUS,
  PROGRESS_TYPE,
} from '@cirrus/models';

export interface ICompletion {
  progress_type: string;
}

export const completeProgressHandler = (
  progresses: IProgressUpdateResponse[]
): ICompletion =>
  progresses.reduce(
    (prev, curr) => {
      if (curr.status === PROGRESS_STATUS.completed) {
        return {
          progress_type:
            curr.progress_type === PROGRESS_TYPE.course
              ? curr.progress_type
              : curr.progress_type === PROGRESS_TYPE.lesson
              ? curr.progress_type
              : prev.progress_type,
        };
      }

      return { progress_type: prev.progress_type };
    },
    { progress_type: '' }
  );
