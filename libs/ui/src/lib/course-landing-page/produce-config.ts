import {
  ICourseOverviewLesson,
  ICoursePlayerConfig,
  IProgress,
} from '@cirrus/models';

export const produceConfig = (
  lesson: Partial<ICourseOverviewLesson>,
  courseProgress: IProgress
): ICoursePlayerConfig => {
  return {
    index: lesson.index ?? '',
    header:
      courseProgress.status === 'not_started' ? 'START LESSON' : 'JUMP BACK IN',
    title: lesson.title ?? '',
    buttonText:
      courseProgress.status === 'not_started' ? 'Get Started' : 'Resume',
    thumbnail:
      lesson?.thumbnail_image_url && lesson.thumbnail_image_url.length > 5
        ? lesson.thumbnail_image_url
        : 'courses/images/lesson-thumbnail.png',
  };
};
