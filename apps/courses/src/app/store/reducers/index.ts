import { ActionReducerMap } from '@ngrx/store';
import * as fromConfig from './config.reducer';
import * as fromLesson from './lesson.reducer';
import { LessonState } from './lesson.reducer';

export interface AppState {
  config: fromConfig.ConfigState;
  lesson: LessonState;
}

export const coursesReducers: ActionReducerMap<AppState> = {
  config: fromConfig.reducer,
  lesson: fromLesson.reducer,
};
