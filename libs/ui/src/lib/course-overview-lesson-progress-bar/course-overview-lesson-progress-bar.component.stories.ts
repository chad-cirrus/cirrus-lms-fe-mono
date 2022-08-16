import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseOverviewLessonProgressBarComponent } from './course-overview-lesson-progress-bar.component';

export default {
  title: 'Course Overview Lesson Progress Bar',
  component: CourseOverviewLessonProgressBarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FlexLayoutModule,
        MatProgressBarModule,
        MatIconModule,
        MatIconRegistryModule,
      ],
    }),
  ],
} as Meta<CourseOverviewLessonProgressBarComponent>;

const Template: Story<CourseOverviewLessonProgressBarComponent> = (
  args: CourseOverviewLessonProgressBarComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  lessonProgress: {
    total: 107,
    completed: 154,
  },
};
