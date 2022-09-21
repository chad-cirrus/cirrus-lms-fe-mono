import { ICourseOverview, PROGRESS_STATUS } from '@cirrus/models';
import { blankCourse } from '../mock-data/mock-courses.data';
import { produceConfig } from './produce-config';

describe('produceConfig', () => {
  it('should say start lesson if the course is not started', () => {
    const sut: ICourseOverview = {
      ...blankCourse,
      next_lesson: {
        id: 846,
        stage_id: 262,
        title: 'Lesson 1',
        subtitle: '',
        order: 0,
        index: '2.1',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: {
          assessments: 1,
        },
        progress: {
          id: 0,
          status: 'not_started',
        },
      },
    };

    const actual = produceConfig(sut.next_lesson, sut.progress);

    expect(actual.header).toBe('START LESSON');
    expect(actual.buttonText).toBe('Get Started');
    expect(actual.title).toBe('Lesson 1');
    expect(actual.index).toBe('2.1');
  });

  it('should say resume lesson if the course is in progress', () => {
    const sut: ICourseOverview = {
      ...blankCourse,
      progress: { id: 0, status: PROGRESS_STATUS.in_progress },
      next_lesson: {
        id: 846,
        stage_id: 262,
        title: 'Lesson 1',
        subtitle: '',
        order: 0,
        index: '2.1',
        thumbnail_image_url: '',
        lesson_type: 2,
        completion_time: '1h 1m',
        content_counts: {
          assessments: 1,
        },
        progress: {
          id: 0,
          status: 'not_started',
        },
      },
    };

    const actual = produceConfig(sut.next_lesson, sut.progress);

    expect(actual.header).toBe('JUMP BACK IN');
    expect(actual.buttonText).toBe('Resume');
    expect(actual.title).toBe('Lesson 1');
    expect(actual.index).toBe('2.1');
  });
});
