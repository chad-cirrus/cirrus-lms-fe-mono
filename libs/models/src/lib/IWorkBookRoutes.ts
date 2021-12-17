export enum LessonStatus {
  NOT_STARTED = 'not_started',
}

export interface IWorkBookRoutes {
  id: number;
  title: string;
  status: LessonStatus;
}
