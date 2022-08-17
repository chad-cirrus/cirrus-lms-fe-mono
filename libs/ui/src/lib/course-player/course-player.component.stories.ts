import { FlexLayoutModule } from '@angular/flex-layout';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CtaButtonComponent } from '../cta-button/cta-button.component';
import { CoursePlayerComponent } from './course-player.component';

export default {
  title: 'Course Player',
  component: CoursePlayerComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule],
      declarations: [CtaButtonComponent],
    }),
  ],
} as Meta<CoursePlayerComponent>;

const Template: Story<CoursePlayerComponent> = (
  args: CoursePlayerComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  config: {
    index: '2.3',
    header: 'JUMP BACK IN',
    title: 'Another title - for comparison contains lengthier keywords',
    buttonText: 'Resume',
    thumbnail: 'courses/images/lesson-thumbnail.png',
  },
};

export const Desktop = Template.bind({});
Desktop.args = {
  config: {
    index: '2.3',
    header: 'JUMP BACK IN',
    title: 'Another title - for comparison contains lengthier keywords',
    buttonText: 'Resume',
    thumbnail: 'courses/images/lesson-thumbnail.png',
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  config: {
    index: '2.3',
    header: 'JUMP BACK IN',
    title: 'Another title - for comparison contains lengthier keywords',
    buttonText: 'Resume',
    thumbnail: 'courses/images/lesson-thumbnail.png',
  },
};
