import { ICourseOverview } from '@cirrus/models';
import { course357, course357CourseNotStarted } from '../mock-data/mock-courses.data';
import { produceConfig } from './produce-config';

describe('produceConfig', () => {
  it('should say start lesson if the course is not started', () => {
    const sut: ICourseOverview = course357CourseNotStarted;

    const actual = produceConfig(sut.next_lesson, sut.progress, '');

    expect(actual.header).toBe('START LESSON');
    expect(actual.buttonText).toBe('Get Started');
    expect(actual.title).toBe('Lesson 1');
    expect(actual.index).toBe('2.1');
  });

  it('should say resume lesson if the course is in progress', () => {
    const sut: ICourseOverview = course357;

    const actual = produceConfig(sut.next_lesson, sut.progress, '');

    expect(actual.header).toBe('JUMP BACK IN');
    expect(actual.buttonText).toBe('Resume');
    expect(actual.title).toBe('Lesson 1');
    expect(actual.index).toBe('2.1');
  });
});
