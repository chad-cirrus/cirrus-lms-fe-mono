import {
  ContentCounts,
  ICourseOverviewLesson,
  ICourseOverviewStage,
} from '@cirrus/models';

const reducer = (prev: ContentCounts, curr: ContentCounts) => {
  const newCurr = { ...curr };
  (Object.keys(prev) as Array<keyof ContentCounts>).forEach(key => {
    newCurr[key] = prev[key]
      ? (newCurr[key] || 0) + (prev[key] || 0)
      : newCurr[key];
  });

  return newCurr;
};

export const calculateLessonSummaryCounts = (
  lessons: ICourseOverviewLesson[]
): ContentCounts => {
  const returnLessons = lessons
    .map(lesson => lesson.content_counts)
    .reduce(reducer, {});

  return returnLessons;
};

export const calculateCourseSummaryCounts = (
  stages: ICourseOverviewStage[]
): ContentCounts => {
  const returnStages = stages
    .map(stage => calculateLessonSummaryCounts(stage.lessons))
    .reduce(reducer, {});

  return returnStages;
};
