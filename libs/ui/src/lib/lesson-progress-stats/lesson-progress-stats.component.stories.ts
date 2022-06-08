import { FlexLayoutModule } from '@angular/flex-layout';
import { ProgressType } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ProgressCardComponent } from '../progress-card/progress-card.component';
import { LessonProgressStatsComponent } from './lesson-progress-stats.component';

export default {
  title: 'LessonProgressStats',
  component: LessonProgressStatsComponent,
  decorators: [
    moduleMetadata({
      declarations: [ProgressCardComponent],
      imports: [FlexLayoutModule],
    }),
  ],
} as Meta<LessonProgressStatsComponent>;

const Template: Story<LessonProgressStatsComponent> = (
  args: LessonProgressStatsComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  progress: [
    {
      type: ProgressType.Flight,
      completedCourses: 16,
      totalCourses: 20,
    },
    {
      type: ProgressType.Ground,
      completedCourses: 5,
      totalCourses: 20,
    },
    {
      type: ProgressType.CrossCountry,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.Simulator,
      completedCourses: 9,
      totalCourses: 20,
    },
    {
      type: ProgressType.Landings,
      completedCourses: 4,
      totalCourses: 20,
    },
    {
      type: ProgressType.Assessment,
      completedCourses: 12,
      totalCourses: 20,
    },
    {
      type: ProgressType.SelfStudy,
      completedCourses: 12,
      totalCourses: 20,
    },
  ],
};
