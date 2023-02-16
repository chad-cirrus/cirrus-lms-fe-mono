export const environment = {
  production: false,
  project: 'recent-activity',
  baseUrl: process.env['NX_BASE_URL'],
  profile:
    'https://cirrusaircraft--cirfullsb.sandbox.my.site.com/approachsso/s/profile/',
  defaultThumbnailCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-thumbnail.jpg',
  defaultLessonThumbnail:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-thumbnail.jpg',
  fullstoryOrgId: process.env['FULL_STORY_ORG_ID'],
};
