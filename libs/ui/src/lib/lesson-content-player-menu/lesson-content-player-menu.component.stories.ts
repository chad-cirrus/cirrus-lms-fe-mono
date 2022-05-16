import { FlexLayoutModule } from '@angular/flex-layout';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LessonContentPlayerMenuComponent } from './lesson-content-player-menu.component';

export default {
  title: 'LessonContentPlayerMenuComponent',
  component: LessonContentPlayerMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule],
    }),
  ],
} as Meta<LessonContentPlayerMenuComponent>;

const Template: Story<LessonContentPlayerMenuComponent> = (
  args: LessonContentPlayerMenuComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  menuItems: [
    {
      icon: 'courses/images/svg/assessment_lc_icon.svg',
      text: 'Intro',
      id: 0,
      progress: {
        id: 0,
        status: 'not_started',
      },
    },
    {
      icon: 'courses/images/svg/video_play.svg',
      text: 'SR22 TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      id: 0,
      progress: {
        id: 0,
        status: 'not_started',
      },
    },
    {
      icon: 'courses/images/svg/quiz_lc_icon.svg',
      text: 'SR22T TKS Anti-Ice System POH Supplement (Perspective+ Avionics Only)',
      id: 0,
      progress: {
        id: 0,
        status: 'not_started',
      },
    },
    {
      icon: 'courses/images/svg/video_play.svg',
      text: 'SR22T TKS Anti-Ice System POH Supplement',
      id: 0,
      progress: {
        id: 0,
        status: 'not_started',
      },
    },
  ],
};
