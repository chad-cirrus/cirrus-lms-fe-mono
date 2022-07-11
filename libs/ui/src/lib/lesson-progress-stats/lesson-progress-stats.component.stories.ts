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
      completed: 16,
      total: 20,
    },
    {
      type: ProgressType.Ground,
      completed: 5,
      total: 20,
    },
    {
      type: ProgressType.CrossCountry,
      completed: 12,
      total: 20,
    },
    {
      type: ProgressType.Simulator,
      completed: 9,
      total: 20,
    },
    {
      type: ProgressType.Landings,
      completed: 4,
      total: 20,
    },
    {
      type: ProgressType.Assessment,
      completed: 12,
      total: 20,
    },
    {
      type: ProgressType.SelfStudy,
      completed: 12,
      total: 20,
    },
  ],
};
