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
    },
    {
      icon: 'courses/images/svg/video_play.svg',
      text: 'Review Lesson Objective',
    },
    {
      icon: 'courses/images/svg/quiz_lc_icon.svg',
      text: 'Completion Standards',
    },
    {
      icon: 'courses/images/svg/video_play.svg',
      text: 'Preflight Planning and Preparation',
    },
  ],
};
