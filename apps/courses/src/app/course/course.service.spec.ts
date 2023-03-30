import { IProgressUpdateResponses, PROGRESS_TYPE } from '@cirrus/models';
import { completeProgressHandler } from '../shared/complete-progress.handler';

describe('course complete response logic', () => {
  it('should be true', () => {
    const expected = 1 === 1;
    expect(expected).toBe(true);
  });

  it('should return that course is complete', () => {
    // arrangement
    const { progresses }: IProgressUpdateResponses = {
      progresses: [
        {
          id: 1774665,
          progressable_type: 'Content',
          course_attempt_id: 119050,
          stage_id: 125,
          lesson_id: 766,
          item_id: 592,
          status: 'completed',
          user_id: 25524,
          course_id: 215,
          progress_type: 'content',
          score: null,
          created_at: '2022-05-05T16:41:44.461Z',
          updated_at: '2022-05-23T11:50:14.125Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
        {
          id: 1774664,
          progressable_type: 'Lesson',
          item_id: 766,
          course_id: 215,
          stage_id: 125,
          lesson_id: 766,
          status: 'completed',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'lesson',
          score: null,
          created_at: '2022-05-05T16:41:44.458Z',
          updated_at: '2022-05-23T11:50:14.136Z',
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
          status: 'completed',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'stage',
          score: null,
          created_at: '2022-05-05T16:41:44.291Z',
          updated_at: '2022-05-23T11:50:14.170Z',
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
          status: 'completed',
          user_id: 25524,
          course_attempt_id: 119050,
          progress_type: 'course',
          score: null,
          created_at: '2022-05-05T16:41:44.280Z',
          updated_at: '2022-05-23T11:50:14.198Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
      progress_stats: [],
    };

    const actual = completeProgressHandler(progresses);

    expect(actual.progress_type).toBe(PROGRESS_TYPE.course);
  });

  it('should return empty string', () => {
    const { progresses } = {
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
          updated_at: '2022-05-23T12:18:52.978Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const actual = completeProgressHandler(progresses);

    expect(actual.progress_type).toBe('');
  });

  it('should return progress type lesson', () => {
    const { progresses } = {
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
          updated_at: '2022-05-23T12:21:04.946Z',
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
          updated_at: '2022-05-23T12:21:04.959Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const actual = completeProgressHandler(progresses);

    expect(actual.progress_type).toBe(PROGRESS_TYPE.lesson);
  });

  it('should return empty string when all responses are in_progress', () => {
    const { progresses } = {
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
          updated_at: '2022-05-23T12:28:28.604Z',
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
          updated_at: '2022-05-23T12:28:28.623Z',
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
          updated_at: '2022-05-23T12:28:28.641Z',
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
          updated_at: '2022-05-23T12:28:28.655Z',
          scorm_progress: null,
          is_force_completed: null,
          ios_uuid: null,
        },
      ],
    };

    const actual = completeProgressHandler(progresses);

    expect(actual.progress_type).toBe('');
  });
});
