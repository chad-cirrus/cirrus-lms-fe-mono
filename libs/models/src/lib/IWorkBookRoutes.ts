import { IProgress } from './IProgress';

export enum LessonStatus {
  NOT_STARTED = 'not_started',
}

export interface IWorkBookRoutes {
  id: number;
  title: string;
  status: LessonStatus;
}

export interface IWorkBook {
  id: number;
  progress: IProgress;
  name: string;
  stages: IStage[];
}

export interface IStage {
  id: number;
  order: number;
  name: string;
  progress: IProgress;
  lessons: IStageLesson[];
}

export interface IStageLesson {
  id: number;
  title: string;
  order: number;
  progress: IProgress;
  stage_lesson_index: string;
}
