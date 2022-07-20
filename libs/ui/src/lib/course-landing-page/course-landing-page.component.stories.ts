import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLandingPageComponent } from './course-landing-page.component';
import { EncodeUriPipe } from '../encode-uri.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

export default {
  title: 'Course Landing Page',
  component: CourseLandingPageComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, MatDividerModule],
      declarations: [EncodeUriPipe],
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
  course: {
    title: 'Private Pilot License Course',
    subTitle: 'An Introductory subhead to the Private Pilot License course',
  },
};
