import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../../course/course.service';
import { LessonsEffects } from './lessons.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  initialLessonState,
  LessonPartialState,
} from '../reducers/lesson.reducer';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { fetchLessons, fetchLessonsSuccess } from '../actions';
import { ILesson } from '@cirrus/models';
import { testData } from '@cirrus/ui';
import { TestScheduler } from 'rxjs/testing';
import { HttpClientModule } from '@angular/common/http';

describe('lessons effects', () => {
  let actions: Observable<Action>;
  let effects: LessonsEffects;
  // const coursesService = jasmine.createSpyObj('coursesService', ['getLessons']);
  let service: CoursesService;
  let store: MockStore<LessonPartialState>;
  let metaData: EffectsMetadata<LessonsEffects>;

  beforeEach(() => {
    const initialState = {
      lesson: initialLessonState,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LessonsEffects,
        CoursesService,
        provideMockActions(() => actions),
        provideMockStore({ initialState }),
      ],
    });

    effects = TestBed.inject(LessonsEffects);
    metaData = getEffectsMetadata(effects);
    service = TestBed.inject(CoursesService);
    store = TestBed.inject(Store) as MockStore<LessonPartialState>;
  });

  describe('dispatching mergeMap effect', () => {
    it('should get the lesson', () => {
      const action = fetchLessons({ courseId: 1 });
      const lesson: ILesson = testData;

      jest.spyOn(service, 'getLessons').mockReturnValue(of(lesson));
      actions = hot('a', { a: action });

      expect(effects.fetchLessons$).toBeObservable(
        cold('a', { a: fetchLessonsSuccess({ lesson }) })
      );
    });
  });
});
