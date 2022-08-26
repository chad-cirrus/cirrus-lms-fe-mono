import { ICourseOverviewLesson, ICourseOverviewStage } from '@cirrus/models';
import {
  calculateCourseSummaryCounts,
  calculateLessonSummaryCounts,
} from './calculateCourseSummaryCounts';

describe('calcuate course summary counts', () => {
  it('should return correct lesson summary count', () => {
    const lessons: ICourseOverviewLesson[] = [
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
    ];

    const actual = calculateLessonSummaryCounts(lessons);

    expect(actual).toEqual({ documents: 3 });
  });

  it('should return correct lesson summary count b', () => {
    const lessons: ICourseOverviewLesson[] = [
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { videos: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
    ];

    const actual = calculateLessonSummaryCounts(lessons);

    expect(actual).toEqual({ videos: 3, documents: 3 });
  });

  it('should return correct lesson summary count b', () => {
    const lessons: ICourseOverviewLesson[] = [
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { videos: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
    ];

    const actual = calculateLessonSummaryCounts(lessons);

    expect(actual).toEqual({ videos: 3, documents: 6 });
  });
  it('should return correct lesson summary count c', () => {
    const lessons: ICourseOverviewLesson[] = [
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { videos: 2 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { documents: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { lessons: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { quizzes: 3 },
        progress: { id: 1775463, status: 'completed' },
      },
      {
        id: 692,
        title: 'Welcome To Your Cirrus Training',
        order: 0,
        index: '1.1',
        thumbnail_image_url: '',
        lesson_type: 0,
        completion_time: '1h 1m',
        content_counts: { quizzes: 1 },
        progress: { id: 1775463, status: 'completed' },
      },
    ];

    const actual = calculateLessonSummaryCounts(lessons);

    expect(actual).toEqual({ videos: 2, documents: 9, lessons: 3, quizzes: 4 });
  });

  it('should reall work', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 243,
        title: 'Course Intro',
        desc: '',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            subtitle: '',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: { documents: 3 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
      {
        id: 244,
        title: 'Self Study',
        desc: '',
        overview: '',
        order: 1,
        lessons_are_linear: false,
        lessons: [
          {
            id: 857,
            title: 'CAPS',
            subtitle: '',
            order: 0,
            index: '2.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: { videos: 10 },
            progress: { id: 1775468, status: 'completed' },
          },
          {
            id: 318,
            title: 'Takeoffs and Landings',
            subtitle: '',
            order: 1,
            index: '2.2',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: { videos: 49 },
            progress: { id: 1775479, status: 'not_started' },
          },
          {
            id: 317,
            title: 'Engine Management',
            subtitle: '',
            order: 2,
            index: '2.3',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: { videos: 6 },
            progress: { id: 1775529, status: 'not_started' },
          },
          {
            id: 595,
            title: 'Workbook',
            subtitle: '',
            order: 3,
            index: '2.4',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '',
            content_counts: { documents: 3 },
            progress: { id: 1775536, status: 'not_started' },
          },
        ],
        progress: { id: 1775467, status: 'in_progress' },
      },
      {
        id: 245,
        title: 'Transition',
        desc: '',
        overview: '',
        order: 2,
        lessons_are_linear: false,
        lessons: [
          {
            id: 834,
            title: 'Lesson 1',
            subtitle: '',
            order: 0,
            index: '3.1',
            thumbnail_image_url: '',
            lesson_type: 1,
            completion_time: '',
            content_counts: { documents: 1, assessments: 1 },
            progress: { id: 1775541, status: 'not_started' },
          },
          {
            id: 835,
            title: 'Lesson 2',
            subtitle: '',
            order: 1,
            index: '3.2',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775545, status: 'not_started' },
          },
          {
            id: 836,
            title: 'Lesson 3',
            subtitle: '',
            order: 2,
            index: '3.3',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775547, status: 'not_started' },
          },
          {
            id: 837,
            title: 'Lesson 4',
            subtitle: '',
            order: 3,
            index: '3.4',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775549, status: 'not_started' },
          },
          {
            id: 838,
            title: 'Lesson 5',
            subtitle: '',
            order: 4,
            index: '3.5',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775551, status: 'not_started' },
          },
          {
            id: 839,
            title: 'Lesson 6',
            subtitle: '',
            order: 5,
            index: '3.6',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775553, status: 'not_started' },
          },
        ],
        progress: { id: 1775540, status: 'not_started' },
      },
      {
        id: 246,
        title: 'Advanced',
        desc: '',
        overview: '',
        order: 3,
        lessons_are_linear: false,
        lessons: [
          {
            id: 840,
            title: 'Lesson 7',
            subtitle: '',
            order: 0,
            index: '4.1',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775556, status: 'not_started' },
          },
          {
            id: 841,
            title: 'Lesson 8',
            subtitle: '',
            order: 1,
            index: '4.2',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775558, status: 'not_started' },
          },
          {
            id: 842,
            title: 'Lesson 9',
            subtitle: '',
            order: 2,
            index: '4.3',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775560, status: 'not_started' },
          },
          {
            id: 843,
            title: 'Lesson 10',
            subtitle: '',
            order: 3,
            index: '4.4',
            thumbnail_image_url: '',
            lesson_type: 2,
            completion_time: '',
            content_counts: { assessments: 1 },
            progress: { id: 1775562, status: 'not_started' },
          },
        ],
        progress: { id: 1775555, status: 'not_started' },
      },
    ];

    const actual = calculateCourseSummaryCounts(stages);

    console.log('actual', actual);

    expect(actual).toEqual({
      // lessons: 15,
      videos: 65,
      documents: 7,
      assessments: 10,
    });
  });

  it('should return correct summary counts with stages and lessons', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { documents: 3 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { documents: 3 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
    ];

    const actual = calculateCourseSummaryCounts(stages);

    expect(actual).toEqual({
      documents: 6,
    });
  });

  it('should return correct summary counts with stages and lessons b', () => {
    const stages: ICourseOverviewStage[] = [
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { documents: 3 },
            progress: { id: 1775463, status: 'completed' },
          },
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { videos: 4 },
            progress: { id: 1775463, status: 'completed' },
          },
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { quizzes: 2, lessons: 5 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { documents: 3 },
            progress: { id: 1775463, status: 'completed' },
          },
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { quizzes: 10, videos: 10 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { documents: 3 },
            progress: { id: 1775463, status: 'completed' },
          },
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { quizzes: 10, videos: 12 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { assessments: 1 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { assessments: 1 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
      {
        id: 243,
        title: 'Course Intro',
        overview: '',
        order: 0,
        lessons_are_linear: false,
        lessons: [
          {
            id: 692,
            title: 'Welcome To Your Cirrus Training',
            order: 0,
            index: '1.1',
            thumbnail_image_url: '',
            lesson_type: 0,
            completion_time: '1h 1m',
            content_counts: { assessments: 1 },
            progress: { id: 1775463, status: 'completed' },
          },
        ],
        progress: { id: 1775462, status: 'completed' },
      },
    ];

    const actual = calculateCourseSummaryCounts(stages);

    expect(actual).toEqual({
      quizzes: 22,
      videos: 26,
      documents: 9,
      lessons: 5,
      assessments: 3,
    });
  });
});
