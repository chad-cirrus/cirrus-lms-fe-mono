import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLandingPageComponent } from './course-landing-page.component';
import { EncodeUriPipe } from '../encode-uri.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { CourseProgressComponent } from '../course-progress/course-progress.component';
import { CoursePlayerComponent } from '../course-player/course-player.component';
import { CourseOverviewComponent } from '../course-overview/course-overview.component';
import { CourseOverviewLessonProgressBarComponent } from '../course-overview-lesson-progress-bar/course-overview-lesson-progress-bar.component';
import { CourseContentProgressCircleComponent } from '../course-content-progress-circle/course-content-progress-circle.component';
import { CourseSummaryCountsComponent } from '../course-summary-counts/course-summary-counts.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CtaButtonComponent } from '../cta-button/cta-button.component';
import { PROGRESS_STATUS } from '@cirrus/models';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { course351 } from '../mock-data/mock-courses.data';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { UiDownloadService } from '../course-completion/ui-download.service';

const mockEnvironment = {
  production: false,
  baseUrl: 'http://cirrusapproach.local:3000',
  profile:
    'https://cirfullsb-cirrusaircraftvpo.cs41.force.com/approachsso/s/profile/',
  defaultMobile:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-mobile.jpg',
  defaultDesktop:
    'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokudevcontainer/content-items/images/default-lesson-hero-desktop.jpg',
};

export default {
  title: 'Course Landing Page',
  component: CourseLandingPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        MatDividerModule,
        MatProgressBarModule,
        RouterModule.forRoot([], { useHash: true }), // fixes no router and no route errors
        MatIconModule,
        MatIconRegistryModule,
      ],
      declarations: [
        EncodeUriPipe,
        CourseProgressComponent,
        CoursePlayerComponent,
        CourseOverviewComponent,
        CourseOverviewLessonProgressBarComponent,
        CourseContentProgressCircleComponent,
        CourseSummaryCountsComponent,
        CtaButtonComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: 'environment',
          useValue: mockEnvironment,
        },
        UiDownloadService,
      ],
    }),
  ],
} as Meta<CourseLandingPageComponent>;

const Template: Story<CourseLandingPageComponent> = (
  args: CourseLandingPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  course: course351,
};

export const CompletedCourse = Template.bind({});
CompletedCourse.args = {
  course: {
    ...course351,
    progress: {
      id: 0,
      status: PROGRESS_STATUS.completed,
    },
  },
};
