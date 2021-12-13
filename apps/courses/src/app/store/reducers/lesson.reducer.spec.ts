import { fetchLessons, fetchLessonsFailure } from '../actions';
import { initialLessonState, reducer } from './lesson.reducer';

describe('reducer: lesson', () => {
  it('should be busy when fetching lessons', () => {
    const newState = reducer(initialLessonState, fetchLessons({ courseId: 1 }));

    expect(newState.busy).toEqual(true);
    expect(newState.error).toEqual(null);
    expect(newState.lesson.contents.length).toEqual(0);
  });

  it('should have an error when it fails', () => {
    const error = new Error('test error');
    const newState = reducer(
      initialLessonState,
      fetchLessonsFailure({ error })
    );

    expect(newState.busy).toEqual(false);

    expect(newState.error.message).toEqual('test error');
    expect(newState.lesson.contents.length).toEqual(0);
  });
});
