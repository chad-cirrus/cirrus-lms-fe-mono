import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MatIconRegistryModule } from '../mat-icon-registry.module';
import { CourseSummaryCountsComponent } from './course-summary-counts.component';

export default {
  title: 'Course Summary Counts',
  component: CourseSummaryCountsComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, MatIconModule, MatIconRegistryModule],
    }),
  ],
} as Meta<CourseSummaryCountsComponent>;

const Template: Story<CourseSummaryCountsComponent> = (
  args: CourseSummaryCountsComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  courseSummaryCounts: {
    lessons: 40,
    assessments: 10,
    videos: 20,
    quizzes: 10,
    documents: 20,
  },
};
