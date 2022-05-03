// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { testDataReccurent853 } from '@cirrus/ui';
import { Meta, Story } from '@storybook/angular';
import { AssessmentComponent } from './assessment.component';

export default {
  title: 'AssessmentComponent',
  component: AssessmentComponent,
} as Meta<AssessmentComponent>;

const Template: Story<AssessmentComponent> = (args: AssessmentComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  content: testDataReccurent853.contents[0],
};
