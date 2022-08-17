import { ActionReducerMap } from '@ngrx/store';
import * as fromLesson from './lesson.reducer';
import { LessonState } from './lesson.reducer';
import * as fromView from './view.reducer';
import * as fromCirrusUser from './cirrus-user.reducer';
import * as fromCourse from './course.reducer';

export interface AppState {
  lesson: LessonState;
  view: fromView.ViewState;
  cirrusUser: fromCirrusUser.UserState;
  course: fromCourse.CourseState;
}

export const coursesReducers: ActionReducerMap<AppState> = {
  lesson: fromLesson.reducer,
  view: fromView.reducer,
  cirrusUser: fromCirrusUser.reducer,
  course: fromCourse.reducer,
};
