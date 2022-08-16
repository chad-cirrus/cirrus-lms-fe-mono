import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseContentProgressCircleComponent } from './course-content-progress-circle.component';

export default {
  title: 'Course Content Progress Circle',
  component: CourseContentProgressCircleComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        MatIconModule,
        MatIconRegistryModule,
        MatProgressSpinnerModule,
      ],
    }),
  ],
} as Meta<CourseContentProgressCircleComponent>;

const Template: Story<CourseContentProgressCircleComponent> = (
  args: CourseContentProgressCircleComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  iconUrl: 'courses/images/svg/self-study-progress-icon.svg',
  label: 'Self Study',
  progress: { completed: 87, total: 100 },
};
export const SelfStudy = Template.bind({});
SelfStudy.args = {
  iconUrl: 'courses/images/svg/self-study-progress-icon.svg',
  label: 'Self Study',
  progress: { completed: 87, total: 100 },
};
export const FlightAssessment = Template.bind({});
FlightAssessment.args = {
  iconUrl: 'courses/images/svg/flight-assessment-progress-icon.svg',
  label: 'Self Study',
  progress: { completed: 12, total: 40 },
};
export const Ground = Template.bind({});
Ground.args = {
  iconUrl: 'courses/images/svg/ground-assessment-progress-icon.svg',
  label: 'Self Study',
  progress: { completed: 8, total: 14 },
};
