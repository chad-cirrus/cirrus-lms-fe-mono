import { IWorkBook } from '@cirrus/models';
import { findNextLesson } from './find-next-lesson';

const workbook: IWorkBook = {
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
            status: 'completed',
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
};

describe('find next lesson helper function', () => {
  it('should be true', () => {
    expect(1 === 1).toBe(true);
  });

  it('should find the next lesson', () => {
    const actual = findNextLesson(workbook);

    expect(actual).toBe(758);
  });
});

const workbook2: IWorkBook = {
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
        status: 'completed',
      },
      lessons: [
        {
          id: 757,
          title: 'Introduction',
          order: 0,
          progress: {
            id: 1774633,
            status: 'completed',
          },
          stage_lesson_index: '1.1 Self-Study',
        },
      ],
    },
    {
      id: 126,
      order: 1,
      name: 'Stage 2',
      progress: {
        id: 9994632,
        status: 'not_started',
      },
      lessons: [
        {
          id: 858,
          title: 'Icing: Theory',
          order: 1,
          progress: {
            id: 1774640,
            status: 'not_started',
          },
          stage_lesson_index: '1.2 Self-Study',
        },
        {
          id: 859,
          title: 'Icing: Types',
          order: 2,
          progress: {
            id: 1774643,
            status: 'not_started',
          },
          stage_lesson_index: '1.3 Self-Study',
        },
      ],
    },
  ],
};

describe('find next lesson helper function when given one stage is completed', () => {
  it('should find the next lesson', () => {
    const actual = findNextLesson(workbook2);

    expect(actual).toBe(858);
  });

  it('should find the next lesson when on stage is complete and one stage has a completed lesson', () => {
    const arrangedWorkbook: IWorkBook = {
      id: 215,
      name: 'name',
      progress: {
        id: 1774631,
        status: 'completed',
      },
      stages: [
        {
          id: 125,
          order: 0,
          name: 'Stage 1',
          progress: {
            id: 1774632,
            status: 'completed',
          },
          lessons: [
            {
              id: 757,
              title: 'Introduction',
              order: 0,
              progress: {
                id: 1774633,
                status: 'completed',
              },
              stage_lesson_index: '1.1 Self-Study',
            },
          ],
        },
        {
          id: 126,
          order: 1,
          name: 'Stage 2',
          progress: {
            id: 9994632,
            status: 'in_progress',
          },
          lessons: [
            {
              id: 858,
              title: 'Icing: Theory',
              order: 1,
              progress: {
                id: 1774640,
                status: 'completed',
              },
              stage_lesson_index: '1.2 Self-Study',
            },
            {
              id: 859,
              title: 'Icing: Types',
              order: 2,
              progress: {
                id: 1774643,
                status: 'not_started',
              },
              stage_lesson_index: '1.3 Self-Study',
            },
          ],
        },
      ],
    };

    const actual = findNextLesson(arrangedWorkbook);

    expect(actual).toBe(859);
  });
});

const workbook3: IWorkBook = {
  id: 215,
  progress: {
    id: 1774631,
    status: 'completed',
  },
  name: 'Icing Awareness Course',
  stages: [
    {
      id: 125,
      order: 0,
      name: 'Stage 1',
      progress: {
        id: 1774632,
        status: 'completed',
      },
      lessons: [
        {
          id: 757,
          title: 'Introduction',
          order: 0,
          progress: {
            id: 1774633,
            status: 'completed',
          },
          stage_lesson_index: '1.1 Self-Study',
        },
      ],
    },
    {
      id: 126,
      order: 1,
      name: 'Stage 2',
      progress: {
        id: 9994632,
        status: 'completed',
      },
      lessons: [
        {
          id: 858,
          title: 'Icing: Theory',
          order: 1,
          progress: {
            id: 1774640,
            status: 'completed',
          },
          stage_lesson_index: '1.2 Self-Study',
        },
        {
          id: 859,
          title: 'Icing: Types',
          order: 2,
          progress: {
            id: 1774643,
            status: 'completed',
          },
          stage_lesson_index: '1.3 Self-Study',
        },
      ],
    },
  ],
};

describe('find next lesson helper function returns 0 when all stages and lessons completed', () => {
  it('should find the next lesson', () => {
    const actual = findNextLesson(workbook3);

    expect(actual).toBe(0);
  });
});

const edgeCaseWorkBook: IWorkBook = {
  id: 360,
  progress: {
    id: 1774800,
    status: 'in_progress',
  },
  name: 'Takeoffs & Landings Flight Syllabus',
  stages: [
    {
      id: 494,
      order: 0,
      name: 'none',
      progress: {
        id: 1774801,
        status: 'completed',
      },
      lessons: [
        {
          id: 955,
          title: 'Your Cirrus Training',
          order: 0,
          progress: {
            id: 1774802,
            status: 'completed',
          },
          stage_lesson_index: '1.1 Self-Study',
        },
      ],
    },
    {
      id: 370,
      order: 1,
      name: 'none',
      progress: {
        id: 1774806,
        status: 'in_progress',
      },
      lessons: [
        {
          id: 855,
          title: 'Lesson 1',
          order: 0,
          progress: {
            id: 1774807,
            status: 'in_progress',
          },
          stage_lesson_index: '2.1 Flight',
        },
      ],
    },
  ],
};

describe('edge case', () => {
  it('should find the next lesson', () => {
    const actual = findNextLesson(edgeCaseWorkBook);

    expect(actual).toBe(855);
  });
});
