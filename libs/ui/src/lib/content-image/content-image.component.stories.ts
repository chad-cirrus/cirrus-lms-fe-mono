import { Meta, moduleMetadata, Story } from '@storybook/angular';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { testDataReccurent853b } from 'libs/models/src/testing/testData853b';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { ContentImageComponent } from './content-image.component';

export default {
  title: 'ContentImageComponent',
  component: ContentImageComponent,
  decorators: [
    moduleMetadata({
      providers: [CirrusSanitizerService],
    }),
  ],
} as Meta<ContentImageComponent>;

const Template: Story<ContentImageComponent> = (args: ContentImageComponent) => ({
  component: ContentImageComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  content: testDataReccurent853b.contents[0],
};
