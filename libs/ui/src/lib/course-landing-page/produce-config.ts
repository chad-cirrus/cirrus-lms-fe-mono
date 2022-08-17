import { ICourseOverviewStage, ICoursePlayerConfig } from '@cirrus/models';

export const produceConfig = (
  stages: ICourseOverviewStage[]
): ICoursePlayerConfig => {
  const lesson = stages
    .find(stage => stage.progress.status !== 'completed')
    ?.lessons.find(lesson => lesson.progress.status !== 'completed');

  return {
    index: lesson?.index ?? '',
    header:
      lesson?.progress.status === 'not_started'
        ? 'START LESSON'
        : 'JUMP BACK IN',
    title: lesson?.title ?? '',
    buttonText:
      lesson?.progress.status === 'not_started' ? 'Get Started' : 'Resume',
    thumbnail:
      lesson?.thumbnail_image_url && lesson.thumbnail_image_url.length > 5
        ? lesson.thumbnail_image_url
        : 'courses/images/lesson-thumbnail.png',
  };
};
