import { IProgressUpdateResponses } from '@cirrus/models';
import { completeProgressSuccess, startProgressSuccess } from '../actions';
import { fetchWorkbook } from '../actions/workbook-routes.actions';
import {
  initialWorkbookRoutesState,
  reducer,
  WorkbookRoutesState,
} from './workbook-routes.reducer';

describe('reducer: workbook-routes', () => {
  it('should return busy state', () => {
    // arrange
    const newState = reducer(
      initialWorkbookRoutesState,
      fetchWorkbook({ courseId: 1 })
    );

    expect(newState.busy).toBe(true);
  });

  it('should update workbook', () => {
    const oldState: WorkbookRoutesState = {
      busy: false,
      error: null,
      workbook: {
        id: 215,
        progress: {
          id: 1774631,
          status: 'not_started',
        },
        name: 'Icing Awareness Course',
        stages: [
          {
            id: 125,
            order: 0,
            name: 'Stage 1',
            progress: {
              id: 1774632,
              status: 'not_started',
            },
            lessons: [
              {
                id: 757,
                title: 'Introduction',
                order: 0,
                progress: {
                  id: 1774633,
                  status: 'not_started',
                },
                stage_lesson_index: '1.1 Self-Study',
              },
              {
                id: 758,
                title: 'Icing: Theory',
                order: 1,
                progress: {
                  id: 1774640,
                  status: 'not_started',
                },
                stage_lesson_index: '1.2 Self-Study',
              },
              {
                id: 759,
                title: 'Icing: Types',
                order: 2,
                progress: {
                  id: 1774643,
                  status: 'not_started',
                },
                stage_lesson_index: '1.3 Self-Study',
              },
              {
                id: 760,
                title: 'Icing: Weather Products',
                order: 3,
                progress: {
                  id: 1774646,
                  status: 'not_started',
                },
                stage_lesson_index: '1.4 Self-Study',
              },
              {
                id: 761,
                title: 'Components',
                order: 4,
                progress: {
                  id: 1774649,
                  status: 'not_started',
                },
                stage_lesson_index: '1.5 Self-Study',
              },
              {
                id: 762,
                title: 'Controls and Operation',
                order: 5,
                progress: {
                  id: 1774652,
                  status: 'not_started',
                },
                stage_lesson_index: '1.6 Self-Study',
              },
              {
                id: 763,
                title: 'Indications',
                order: 6,
                progress: {
                  id: 1774655,
                  status: 'not_started',
                },
                stage_lesson_index: '1.7 Self-Study',
              },
              {
                id: 764,
                title: 'Abnormals',
                order: 7,
                progress: {
                  id: 1774658,
                  status: 'not_started',
                },
                stage_lesson_index: '1.8 Self-Study',
              },
              {
                id: 765,
                title: 'Limitations',
                order: 8,
                progress: {
                  id: 1774661,
                  status: 'not_started',
                },
                stage_lesson_index: '1.9 Self-Study',
              },
              {
                id: 766,
                title: 'Preflight',
                order: 9,
                progress: {
                  id: 1774664,
                  status: 'not_started',
                },
                stage_lesson_index: '1.10 Self-Study',
              },
            ],
          },
        ],
      },
    };

    const responses: IProgressUpdateResponses = {
      progresses: [
        {
          id: 1774634,
          progressable_type: 'Content',
          course_attempt_id: 119050,
          stage_id: 125,
          lesson_id: 757,
          item_id: 593,
          status: 'in_progress',
          user_id: 25524,
          course_id: 215,
          progress_type: 'content',
          score: null,
          created_at: '2022-05-05T16:41:44.305Z',
          updated_at: '2022-05-26T16:03:58.802Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774633,
          progressable_type: 'Lesson',
          item_id: 757,
          course_id: 215,
          stage_id: 125,
          lesson_id: 757,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'lesson',
          score: null,
          created_at: '2022-05-05T16:41:44.298Z',
          updated_at: '2022-05-26T16:03:58.823Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774632,
          progressable_type: 'Stage',
          item_id: 125,
          course_id: 215,
          stage_id: 125,
          lesson_id: 0,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'stage',
          score: null,
          created_at: '2022-05-05T16:41:44.291Z',
          updated_at: '2022-05-26T16:03:58.837Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774631,
          progressable_type: 'Course',
          item_id: 215,
          course_id: 215,
          stage_id: 0,
          lesson_id: 0,
          status: 'in_progress',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'course',
          score: null,
          created_at: '2022-05-05T16:41:44.280Z',
          updated_at: '2022-05-26T16:03:58.861Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const newState = reducer(oldState, startProgressSuccess({ responses }));

    expect(newState.workbook.progress.status).toBe('in_progress');
    expect(newState.workbook.stages[0].progress.status).toBe('in_progress');
    expect(newState.workbook.stages[0].lessons[0].progress.status).toBe(
      'in_progress'
    );
    expect(newState.workbook.stages[0].lessons[1].progress.status).toBe(
      'not_started'
    );
    expect(newState.workbook.stages[0].lessons[2].progress.status).toBe(
      'not_started'
    );

    const completionResponse: IProgressUpdateResponses = {
      progresses: [
        {
          id: 1774634,
          progressable_type: 'Content',
          course_attempt_id: 119050,
          stage_id: 125,
          lesson_id: 757,
          item_id: 593,
          status: 'completed',
          user_id: 25524,
          course_id: 215,
          progress_type: 'content',
          score: null,
          created_at: '2022-05-05T16:41:44.305Z',
          updated_at: '2022-05-26T16:11:12.832Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const stateAfterCompletion = reducer(
      newState,
      completeProgressSuccess({ responses: completionResponse })
    );

    expect(stateAfterCompletion.workbook.progress.status).toBe('in_progress');
    expect(stateAfterCompletion.workbook.stages[0].progress.status).toBe(
      'in_progress'
    );
    expect(
      stateAfterCompletion.workbook.stages[0].lessons[0].progress.status
    ).toBe('in_progress');
    expect(
      stateAfterCompletion.workbook.stages[0].lessons[1].progress.status
    ).toBe('not_started');
    expect(
      stateAfterCompletion.workbook.stages[0].lessons[2].progress.status
    ).toBe('not_started');
  });

  it('should update the lesson when last content item of lesson is completed', () => {
    const oldState: WorkbookRoutesState = {
      busy: false,
      error: null,
      workbook: {
        id: 215,
        progress: {
          id: 1774631,
          status: 'in_progress',
        },
        name: 'Icing Awareness Course',
        stages: [
          {
            id: 125,
            order: 0,
            name: 'Stage 1',
            progress: {
              id: 1774632,
              status: 'in_progress',
            },
            lessons: [
              {
                id: 757,
                title: 'Introduction',
                order: 0,
                progress: {
                  id: 1774633,
                  status: 'in_progress',
                },
                stage_lesson_index: '1.1 Self-Study',
              },
              {
                id: 758,
                title: 'Icing: Theory',
                order: 1,
                progress: {
                  id: 1774640,
                  status: 'not_started',
                },
                stage_lesson_index: '1.2 Self-Study',
              },
              {
                id: 759,
                title: 'Icing: Types',
                order: 2,
                progress: {
                  id: 1774643,
                  status: 'not_started',
                },
                stage_lesson_index: '1.3 Self-Study',
              },
              {
                id: 760,
                title: 'Icing: Weather Products',
                order: 3,
                progress: {
                  id: 1774646,
                  status: 'not_started',
                },
                stage_lesson_index: '1.4 Self-Study',
              },
              {
                id: 761,
                title: 'Components',
                order: 4,
                progress: {
                  id: 1774649,
                  status: 'not_started',
                },
                stage_lesson_index: '1.5 Self-Study',
              },
              {
                id: 762,
                title: 'Controls and Operation',
                order: 5,
                progress: {
                  id: 1774652,
                  status: 'not_started',
                },
                stage_lesson_index: '1.6 Self-Study',
              },
              {
                id: 763,
                title: 'Indications',
                order: 6,
                progress: {
                  id: 1774655,
                  status: 'not_started',
                },
                stage_lesson_index: '1.7 Self-Study',
              },
              {
                id: 764,
                title: 'Abnormals',
                order: 7,
                progress: {
                  id: 1774658,
                  status: 'not_started',
                },
                stage_lesson_index: '1.8 Self-Study',
              },
              {
                id: 765,
                title: 'Limitations',
                order: 8,
                progress: {
                  id: 1774661,
                  status: 'not_started',
                },
                stage_lesson_index: '1.9 Self-Study',
              },
              {
                id: 766,
                title: 'Preflight',
                order: 9,
                progress: {
                  id: 1774664,
                  status: 'not_started',
                },
                stage_lesson_index: '1.10 Self-Study',
              },
            ],
          },
        ],
      },
    };

    const completionResponses = {
      progresses: [
        {
          id: 1774639,
          progressable_type: 'Content',
          course_attempt_id: 119050,
          stage_id: 125,
          lesson_id: 757,
          item_id: 911,
          status: 'completed',
          user_id: 25524,
          course_id: 215,
          progress_type: 'content',
          score: null,
          created_at: '2022-05-05T16:41:44.338Z',
          updated_at: '2022-05-26T18:02:27.077Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774633,
          progressable_type: 'Lesson',
          item_id: 757,
          course_id: 215,
          stage_id: 125,
          lesson_id: 757,
          status: 'completed',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'lesson',
          score: null,
          created_at: '2022-05-05T16:41:44.298Z',
          updated_at: '2022-05-26T18:02:27.127Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const newState: WorkbookRoutesState = reducer(
      oldState,
      completeProgressSuccess({ responses: completionResponses })
    );

    expect(newState.workbook.progress.status).toBe(
      oldState.workbook.progress.status
    );

    expect(newState.workbook.stages[0].progress.status).toBe(
      oldState.workbook.stages[0].progress.status
    );

    expect(newState.workbook.stages[0].lessons[0].progress.status).toBe(
      'completed'
    );

    newState.workbook.stages[0].lessons.forEach((lesson, index) => {
      const expected = index === 0 ? 'completed' : 'not_started';

      expect(lesson.progress.status).toBe(expected);
    });
  });
});
