/* eslint-disable @nx/enforce-module-boundaries */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ctdContents, ctdLesson } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { testData } from 'libs/models/src/testing/testData';
import { testData855 } from 'libs/models/src/testing/testData855';
import { testDataIcingAwarenessCourse } from 'libs/models/src/testing/testDataIcingLesson';

import { LessonContentItemComponent } from '../lesson-content-item/lesson-content-item.component';
import { LessonContentsComponent } from '../lesson-contents/lesson-contents.component';
import { LessonProgressComponent } from '../lesson-progress/lesson-progress.component';
import { ProgressCardComponent } from '../progress-card/progress-card.component';
import { LessonLandingPageComponent } from './lesson-landing-page.component';
import { MatDividerModule } from '@angular/material/divider';
import { LessonProgressStatsComponent } from '../lesson-progress-stats/lesson-progress-stats.component';
import { EncodeUriPipe } from '../encode-uri.pipe';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CtaButtonComponent } from '../cta-button/cta-button.component';

const mockEnvironment = {
  production: false,
  baseUrl: 'http://cirrusapproach.local:3000',
  profile: 'https://cirfullsb-cirrusaircraftvpo.cs41.force.com/approachsso/s/profile/',
  defaultMobileLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg',
  defaultDesktopLesson:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg',
  defaultMobileCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-hero-sm.jpg',
  defaultDesktopCourse:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-course-hero-lg.jpg',
};

export default {
  title: 'LessonLandingPageComponent',
  component: LessonLandingPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        LessonContentItemComponent,
        LessonProgressComponent,
        LessonContentsComponent,
        ProgressCardComponent,
        LessonProgressStatsComponent,
        EncodeUriPipe,
        CtaButtonComponent,
      ],
      imports: [
        MatButtonModule,
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        RouterModule.forRoot([], { useHash: true }),
        MatIconModule,
        MatIconRegistryModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
      ],
    }),
  ],
} as Meta<LessonLandingPageComponent>;

const Template: Story<LessonLandingPageComponent> = (args: LessonLandingPageComponent) => ({
  component: LessonLandingPageComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  lesson: testData,
  sideNavOpen: false,
  courseComplete: false,
  isScreenSmall: false,
};

export const PrimaryMobile = Template.bind({});
PrimaryMobile.args = {
  lesson: testData,
  sideNavOpen: false,
  courseComplete: false,
  isScreenSmall: true,
};

export const CrashTestDummy = Template.bind({});
CrashTestDummy.args = {
  lesson: {
    ...ctdLesson,
    contents: ctdContents,
  },
  sideNavOpen: false,
  courseComplete: false,
};

export const InstructorView = Template.bind({});
InstructorView.args = {
  lesson: testData,
  sideNavOpen: false,
  courseComplete: false,
};

export const InProgress = Template.bind({});
InProgress.args = {
  lesson: { ...testData, progress: { id: 0, status: 'in_progress' } },
  sideNavOpen: false,
  courseComplete: false,
};

export const Completed = Template.bind({});
Completed.args = {
  lesson: { ...testData, progress: { id: 0, status: 'completed' } },
  sideNavOpen: false,
  courseComplete: false,
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  lesson: testData,
  sideNavOpen: false,
  courseComplete: false,
};

export const LastLessonCompleteCourse = Template.bind({});
LastLessonCompleteCourse.args = {
  lesson: { ...testData, progress: { id: 0, status: 'completed' } },
  sideNavOpen: false,
  courseComplete: true,
};

export const FlightAssessmentOnly = Template.bind({});
FlightAssessmentOnly.args = {
  lesson: { ...testData, lesson_type: 2 },
  sideNavOpen: false,
  courseComplete: false,
};

export const IcingAwarenessCourse = Template.bind({});
IcingAwarenessCourse.args = {
  lesson: testDataIcingAwarenessCourse,
  sideNavOpen: false,
  courseComplete: false,
};

export const TakeOffsAndLandings = Template.bind({});
TakeOffsAndLandings.args = {
  lesson: testData855,
  sideNavOpen: false,
  courseComplete: false,
};
