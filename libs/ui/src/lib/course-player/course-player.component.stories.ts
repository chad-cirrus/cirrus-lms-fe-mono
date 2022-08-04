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
  lessonNumber: 1,
  chapter: 1.1,
  description: 'This is a title with exactly 60 characters which is the maxx',
  buttonText: 'Get Started',
};

export const Desktop = Template.bind({});
Desktop.args = {
  lessonNumber: 1,
  chapter: 1.1,
  description: 'This is a title with exactly 60 characters which is the maxx',
  buttonText: 'Get Started',
};

export const Mobile = Template.bind({});
Mobile.args = {
  lessonNumber: 1,
  chapter: 1.1,
  description: 'Please display this in mobile mode in dev tools. Mobile view',
  buttonText: 'Get Started',
};
