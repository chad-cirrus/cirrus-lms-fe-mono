// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { testDataReccurent853 } from '@cirrus/ui';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { AssessmentComponent } from './assessment.component';
import { LogbookComponent } from '../logbook/logbook.component';
import { TaskComponent } from '../task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

export default {
  title: 'AssessmentComponent',
  component: AssessmentComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatTabsModule],
      declarations: [LogbookComponent, TaskComponent],
    }),
  ],
} as Meta<AssessmentComponent>;

const Template: Story<AssessmentComponent> = (args: AssessmentComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  content: testDataReccurent853.contents[0],
};
