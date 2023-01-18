#NGRX

https://nx.dev/recipes/other/misc-ngrx

https://ngrx.io/docs

PPL makes heavy use of NGRX, a redux pattern state management system.  

I'm going to explain the NGRX pattern this way: actions, state & reducers, effects and selectors. You might think, especially if you have done redux before that you should lead off with state then actions, then effects and selectors. But when I build out a redux I find that leading off with action helps really comprehend the redux pattern.

For example. We want to fetch a resource from the api and then make that resource available to the application. For example in cirrus we want to fetch a course or lesson. We are going to fetch the lesson, which will update the state, make the state "busy", then there will be a side effect (the api returns with a response: either success or failure), which will then lead to another action and another state change. Finally, the application will employ a selector, an observable when implemented will render a new view.

Allow me to explain.

>The way that PPL/Cirrus Mono-Repo implements NGRX is rather different than the way the NX docs and the NGRX docs teaches NGRX. Those docs rely heavily on Angular Cli schematics to produce a lot of boilerplate code. We don't do that. However, the principles of store, actions, reducers, effects and selectors do not vary from our code and their examples. Thus, I am going to drawing examples from the mono-repo code base.

##Actions

What are we doing? Answer we are fetching a resource.

To answer this lets look at the courses project, specifically the store directory. And in that directory are four folders for each of the main attributes of an ngrx system: actions, reducers, effects, and selectors. _I'm going to skip setup because honestly the NGRX docs and hundreds and hundreds of tutorials do a better job of that than I could.

Focus on the course.actions.ts file

```typescript
import { ICourseOverview } from '@cirrus/models';
import { createAction, props } from '@ngrx/store';

export const fetchCourseOverview = createAction(
  '[courses component] fetch courseOverview',
  props<{ courseId: number }>()
);

export const fetchCourseOverviewSuccess = createAction(
  '[courses effects] fetch courseOverview success',
  props<{ courseOverview: ICourseOverview }>()
);

export const fetchCourseOverviewSuccess = createAction(
  '[courses effects] fetch courseOverview failure',
  props<{ error: any }>()
);
```

This is a good example. There are three actions. NGRX, and all redux systems are predicated on pure functions. When we fetch a course overview with a particular courseId all we can say is that it is _true_ that the application is currently busy fetching a course overview. This is because of the asynchronous and frankly uncertain nature of fetching a resource from an api.  The fetchCourseOverviewSuccess and fetchCourseOverviewSuccess will be called as side effects by the effects module. More on that when we get to that.

##State and Reducers

__State__, that is an object that holds onto various concepts that the application uses to pass information to the user (example: what a course is, what a lesson is, and the progress of those courses and lessons) and to maintain view aspects of the application (example: viewport width, mobile vs desktop view, sidenav extended or closed, etc.)

Let's unpack reducers/index.ts

```typescript
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
```

This file manages the overall AppState for the store.module. The coursesReducer (so called because this is implemented in the Courses MFE application) is an aggregation of four feature states. We will be looking at the course feature state.

So how does the action change state. The answer is through the reducer. In the store directory is the reducer directory with a course.reducer file.

```typescript
export const reducer = createReducer(
  initialCourseState,
  on(fetchCourseOverview, state => ({ ...state, busy: true, error: null })),
  on(fetchCourseOverviewSuccess, (state, { courseOverview }) => ({
    busy: false,
    error: null,
    courseOverview: setCourseImages(courseOverview),
  })),
  on(fetchCourseOverviewFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  }))
);
```

In the old days of ngrx this used to be a switch statement and underneath the hood it still is. But what it is saying is that Store is going to be listening for actions. And it receives the fetchCourseOverview action it will take current state and it will create a new copy of state (notice the spread operator) where busy is true and error is null. And then that new state will become the current state.

##Effects

Did we actually fetch the course overview? Because it kind of looks like we didn't. Directly speaking we did not fetch the resource. All we really did was change the busy state. That's because the fetch is really a side effect and that is handled by the effects module. 

Sidenote: Effects module, like the store module is imported into the app.module.  It looks like this:

```typescript
@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    StoreModule.forRoot(coursesReducers),
    extModules,
    EffectsModule.forRoot([LessonsEffects, ProgressEffects]),
    // ...
  ],
  providers: [
    // ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

If you look at the individual files within the store subdirectories you should see a patter. There are lessons.actions, lessons.effects, lesson.reducer and lessons.selector. We are looking at course overview. And we are going to look at the fetchCourseOverview effect. There is no course.effects file but that effect was placed in the intellectually proximate lessons.effects file.  Let's unpack it:

```typescript
fetchCourseOverview$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fetchCourseOverview),
    mergeMap(({ courseId }) =>
      this.coursesService.getCourseOverview(courseId).pipe(
        map(courseOverview => fetchCourseOverviewSuccess({ courseOverview })),
        catchError(error => of(fetchCourseOverviewFailure({ error })))
      )
    )
  )
);
```

What the above is saying that the effects module is listening to the stream of actions and when it picks up the fetchCourseOverview action it will take the courseId and then it will make an api call `getCourseOverview(courseId)` and then one or two things will happen: success or failure. Success is determined by a 200 HttpResponse, failure is determined by an HttpError. If we get the 200 we will map to the fetchCourseOverviewSuccess action `map(courseOverview => fetchCourseOverviewSuccess({ courseOverview }))`, and if we error we do the opposite `catchError(error => of(fetchCourseOverviewFailure({ error })))`, we dispatch the fetchOverviewFailure action. 

Let's look at how the course reducer responds to those actions: 

```typescript
export const reducer = createReducer(
  initialCourseState,
  on(fetchCourseOverview, state => ({ ...state, busy: true, error: null })),
  on(fetchCourseOverviewSuccess, (state, { courseOverview }) => ({
    busy: false,
    error: null,
    courseOverview: setCourseImages(courseOverview),
  })),
  on(fetchCourseOverviewFailure, (state, { error }) => ({
    ...state,
    busy: false,
    error,
  }))
);
```

On failure, we set the busy state to false, because the app is no longer fetching and we set the error object to HttpError object. Currently (Jan 18, 2023), we are doing with errors in the app. But we are capturing and so if we wanted to log it the basis exists for it. 

On success, we null out error and set busy to false. We populate the courseOverview object via a helper function.  In the similar lessons chain we just pass the lesson object in the lesson state. But in courses we use a helper function. With courseOverview there is the matter of assigning default thumbnail images if none are present. 

##Selectors

The best analog for selectors are SQL select statements.  If it helps to think of NGRX as an in memory db, then selectors are select statements. They are used frequently throughout our apps. 

>Within the createSelector functions the first parameter is the state being passed in and the second parameter is the projection function.

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from '../reducers/course.reducer';

export const selectCourseFeature =
  createFeatureSelector<fromCourse.CourseState>('course');

export const selectCourseOverview = createSelector(
  selectCourseFeature,
  state => state.courseOverview
);

export const selectStages = createSelector(
  selectCourseOverview,
  overview => overview.stages
);

export const selectNextLessonPath = createSelector(
  selectCourseOverview,
  (overview): string | null => {
    const nextStage = overview.stages.find(stage => ['not_started', 'in_progress'].includes(stage.progress.status));
    if (nextStage === undefined) return null;

    const nextLesson = nextStage.lessons.find(lesson => ['not_started', 'in_progress'].includes(lesson.progress.status));
    if (nextLesson === undefined) {
      throw new Error(`Stage ${nextStage.id} is ${nextStage.progress.status} but has no incomplete lessons`);
      // TODO: Add Sentry to the project and capture this error
    }

    return `/courses/${overview.id}/stages/${nextStage.id}/lessons/${nextLesson.id}`;
  }
)
```

selectCourseFeature is taking the whole feature state.  selectCourseOverview is taking the featureState and then portioning off a piece of that state, courseOverview. selectStages further drills down into coursesState, taking the courseOverview and portioning off stages.

selectNextLessonPath, created by Mike Yockey, performs a lot of logic.  


