import { ICourseOverviewStage, ICoursePlayerConfig } from '@cirrus/models';
import { produceConfig } from './produce-config';

describe('produce config', () => {
  it('should produce the first lesson in a fresh course', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 0,
        title: 'Stage 1',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            order: 1,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 3, status: 'not_started' },
          },
          {
            id: 1,
            title: 'Lesson 2',
            order: 1,
            index: '1.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 4, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
      {
        id: 1,
        title: 'Stage 2',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 3',
            order: 1,
            index: '2.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 5, status: 'not_started' },
          },
          {
            id: 1,
            title: 'Lesson 4',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 6, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
    ];

    const expected: ICoursePlayerConfig = {
      index: '1.1',
      header: 'START LESSON',
      title: '',
      buttonText: 'Get Started',
      thumbnail: '',
    };

    const actual = produceConfig(stages);

    expect(expected.index).toBe(actual.index);
    expect(expected.header).toBe(actual.header);
    expect(expected.buttonText).toBe(actual.buttonText);
  });

  it('should produce the first lesson in a course that is in progress and first lesson is in progress', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 0,
        title: 'Stage 1',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            order: 1,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 3, status: 'in_progress' },
          },
          {
            id: 1,
            title: 'Lesson 2',
            order: 1,
            index: '1.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 4, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
      {
        id: 1,
        title: 'Stage 2',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 3',
            order: 1,
            index: '2.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 5, status: 'not_started' },
          },
          {
            id: 1,
            title: 'Lesson 4',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 6, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
    ];

    const expected: ICoursePlayerConfig = {
      index: '1.1',
      header: 'JUMP BACK IN',
      title: '',
      buttonText: 'Resume',
      thumbnail: '',
    };

    const actual = produceConfig(stages);

    expect(expected.index).toBe(actual.index);
    expect(expected.header).toBe(actual.header);
    expect(expected.buttonText).toBe(actual.buttonText);
  });

  it('should produce the second lesson first stage', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 0,
        title: 'Stage 1',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            order: 1,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 3, status: 'completed' },
          },
          {
            id: 1,
            title: 'Lesson 2',
            order: 1,
            index: '1.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 4, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
      {
        id: 1,
        title: 'Stage 2',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 3',
            order: 1,
            index: '2.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 5, status: 'not_started' },
          },
          {
            id: 1,
            title: 'Lesson 4',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 6, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
    ];

    const expected: ICoursePlayerConfig = {
      index: '1.2',
      header: 'START LESSON',
      title: '',
      buttonText: 'Get Started',
      thumbnail: '',
    };

    const actual = produceConfig(stages);

    expect(expected.index).toBe(actual.index);
    expect(expected.header).toBe(actual.header);
    expect(expected.buttonText).toBe(actual.buttonText);
  });

  it('should produce the first lesson stage 2', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 0,
        title: 'Stage 1',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            order: 1,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 3, status: 'completed' },
          },
          {
            id: 1,
            title: 'Lesson 2',
            order: 1,
            index: '1.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 4, status: 'completed' },
          },
        ],
        progress: { id: 1, status: 'completed' },
      },
      {
        id: 1,
        title: 'Stage 2',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 3',
            order: 1,
            index: '2.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 5, status: 'not_started' },
          },
          {
            id: 1,
            title: 'Lesson 4',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 6, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
    ];

    const expected: ICoursePlayerConfig = {
      index: '2.1',
      header: 'START LESSON',
      title: '',
      buttonText: 'Get Started',
      thumbnail: '',
    };

    const actual = produceConfig(stages);

    expect(expected.index).toBe(actual.index);
    expect(expected.header).toBe(actual.header);
    expect(expected.buttonText).toBe(actual.buttonText);
  });

  it('should create the correct thumbnail', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 0,
        title: 'Stage 1',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            order: 1,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 3, status: 'completed' },
          },
          {
            id: 1,
            title: 'Lesson 2',
            order: 1,
            index: '1.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 4, status: 'completed' },
          },
        ],
        progress: { id: 1, status: 'completed' },
      },
      {
        id: 1,
        title: 'Stage 2',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 3',
            order: 1,
            index: '2.1',
            thumbnail_image_url: 'thumbnail',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 5, status: 'not_started' },
          },
          {
            id: 1,
            title: 'Lesson 4',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 6, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
    ];

    const expected: ICoursePlayerConfig = {
      index: '2.1',
      header: 'START LESSON',
      title: '',
      buttonText: 'Get Started',
      thumbnail: 'thumbnail',
    };

    const actual = produceConfig(stages);

    expect(expected.index).toBe(actual.index);
    expect(expected.header).toBe(actual.header);
    expect(expected.buttonText).toBe(actual.buttonText);
    expect(expected.thumbnail).toBe(actual.thumbnail);
  });

  it('should create the default thumbnail', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 0,
        title: 'Stage 1',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            order: 1,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 3, status: 'completed' },
          },
          {
            id: 1,
            title: 'Lesson 2',
            order: 1,
            index: '1.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 4, status: 'completed' },
          },
        ],
        progress: { id: 1, status: 'completed' },
      },
      {
        id: 1,
        title: 'Stage 2',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 1,
            title: 'Lesson 3',
            order: 1,
            index: '2.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 5, status: 'not_started' },
          },
          {
            id: 1,
            title: 'Lesson 4',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: new Date(),
            content_counts: { documents: 3 },
            progress: { id: 6, status: 'not_started' },
          },
        ],
        progress: { id: 1, status: 'not_started' },
      },
    ];

    const expected: ICoursePlayerConfig = {
      index: '2.1',
      header: 'START LESSON',
      title: '',
      buttonText: 'Get Started',
      thumbnail: '',
    };

    const actual = produceConfig(stages);

    expect(expected.index).toBe(actual.index);
    expect(expected.header).toBe(actual.header);
    expect(expected.buttonText).toBe(actual.buttonText);
    expect('courses/images/lesson-thumbnail.png').toBe(actual.thumbnail);
  });
});
