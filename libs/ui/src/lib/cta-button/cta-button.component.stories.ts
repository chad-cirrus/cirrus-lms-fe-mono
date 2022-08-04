import { MatButtonModule } from '@angular/material/button';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CtaButtonComponent } from './cta-button.component';

export default {
  title: 'Cta Button',
  component: CtaButtonComponent,
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule],
    }),
  ],
} as Meta<CtaButtonComponent>;

const Template: Story<CtaButtonComponent> = (args: CtaButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Get Started',
};

export const Get_Started = Template.bind({});
Get_Started.args = {
  text: 'Get Started',
};

export const Get_Started_Wide = Template.bind({});
Get_Started_Wide.args = {
  text: 'Get Started',
};

export const re_enroll_wide = Template.bind({});
re_enroll_wide.args = {
  text: 'Re-Enroll',
  icon: 'courses/images/svg/re-enroll.svg',
};

export const re_enroll = Template.bind({});
re_enroll.args = {
  text: 'Re-Enroll',
  icon: 'courses/images/svg/re-enroll.svg',
};

export const resume = Template.bind({});
resume.args = {
  text: 'Resume',
};
