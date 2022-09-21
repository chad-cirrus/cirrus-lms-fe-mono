import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HoursAndLandingStatType } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseContentProgressCircleComponent } from '../course-content-progress-circle/course-content-progress-circle.component';
import { CourseOverviewLessonProgressBarComponent } from '../course-overview-lesson-progress-bar/course-overview-lesson-progress-bar.component';
import { CourseProgressComponent } from '../course-progress/course-progress.component';
import { CourseSummaryCountsComponent } from '../course-summary-counts/course-summary-counts.component';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseOverviewComponent } from './course-overview.component';
import { MatDividerModule } from '@angular/material/divider';
import { HoursAndLandingsComponent } from '../hours-and-landings/hours-and-landings.component';
import { HoursLandingTypeToIconPipe } from '../helpers/HoursLandingTypeToIcon.pipe';
import { HoursLandingTypeToTextPipe } from '../helpers/HoursLandingTypeToText.pipe';
import { course351 } from '../mock-data/mock-courses.data';

import { course466 } from '../mock-data/mock-courses.data';

export default {
  title: 'Course Component Overview Tab Content',
  component: CourseOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        MatIconModule,
        MatIconRegistryModule,
        MatProgressBarModule,
        MatDividerModule,
      ],
      declarations: [
        CourseOverviewComponent,
        CourseSummaryCountsComponent,
        CourseProgressComponent,
        CourseOverviewLessonProgressBarComponent,
        CourseContentProgressCircleComponent,
        HoursAndLandingsComponent,
        HoursLandingTypeToIconPipe,
        HoursLandingTypeToTextPipe,
      ],
    }),
  ],
} as Meta<CourseOverviewComponent>;

const Template: Story<CourseOverviewComponent> = (
  args: CourseOverviewComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  courseOverview: course351,
};

export const Primary2 = Template.bind({});
Primary2.args = {
  courseOverview: {
    ...course351,
    hours_and_landings_stats: [
      { type: HoursAndLandingStatType.completed_total_hours, completed: 10 },
      {
        type: HoursAndLandingStatType.completed_ground_instruction_hours,
        completed: 10,
      },
      { type: HoursAndLandingStatType.completed_sim_hours, completed: 10 },
      {
        type: HoursAndLandingStatType.completed_cross_country_hours,
        completed: 10,
      },
      { type: HoursAndLandingStatType.completed_total_landings, completed: 10 },
    ],
  },
};

export const SelfStudy = Template.bind({});
SelfStudy.args = {
  courseOverview: course466,
};

export const FlightAssessment = Template.bind({});
FlightAssessment.args = {
  courseOverview: {
    ...course466,
    course_content_stats: [
      { type: 'self_study', completed: 0, total: 51 },
      { type: 'flight_assessment', completed: 0, total: 10 },
      { type: 'ground_assessment', completed: 0, total: 0 },
    ],
  },
};

export const GroundAssessment = Template.bind({});
GroundAssessment.args = {
  courseOverview: {
    ...course466,
    course_content_stats: [
      { type: 'self_study', completed: 0, total: 51 },
      { type: 'flight_assessment', completed: 0, total: 0 },
      { type: 'ground_assessment', completed: 0, total: 10 },
    ],
  },
};
