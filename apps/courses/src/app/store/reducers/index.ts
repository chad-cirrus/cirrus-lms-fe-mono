import { ActionReducerMap } from '@ngrx/store';
import * as fromLesson from './lesson.reducer';
import * as fromWorkbookRoutes from './workbook-routes.reducer';
import { LessonState } from './lesson.reducer';
import * as fromView from './view.reducer';
import * as fromCirrusUser from './cirrus-user.reducer';

export interface AppState {
  lesson: LessonState;
  routes: fromWorkbookRoutes.WorkbookRoutesState;
  view: fromView.ViewState;
  cirrusUser: fromCirrusUser.UserState;
}

export const coursesReducers: ActionReducerMap<AppState> = {
  lesson: fromLesson.reducer,
  routes: fromWorkbookRoutes.reducer,
  view: fromView.reducer,
  cirrusUser: fromCirrusUser.reducer,
};
