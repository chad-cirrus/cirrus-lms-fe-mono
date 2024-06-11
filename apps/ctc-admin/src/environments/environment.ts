// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  project: 'ctc-admin',
  baseUrl: 'https://cirrusapproach.local',
  profile: 'https://cirrusaircraft.com?app_name=Salesforce&option=oauthredirect&redirect_url=https%3A%2f%2fcirrusaircraft.com%2faccount%2fprofile',
  defaultThumbnailCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-thumbnail.jpg',
  defaultLessonThumbnail:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-thumbnail.jpg',
  fullstoryOrgId: 'o-1NX9CW-na1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
