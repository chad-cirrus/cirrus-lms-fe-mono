import { FlexLayoutModule } from '@angular/flex-layout';
import { PROGRESS_STATUS } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CoursesTabEnrollmentHistoryComponent } from './courses-tab-enrollment-history.component';

export default {
  title: 'Course Tab Enrollment History',
  component: CoursesTabEnrollmentHistoryComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule],
    }),
  ],
} as Meta<CoursesTabEnrollmentHistoryComponent>;

const Template: Story<CoursesTabEnrollmentHistoryComponent> = (
  args: CoursesTabEnrollmentHistoryComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  enrollments: [
    {
      id: 119066,
      course_version: '1.10',
      enrollment_date: '07/14/22 - present',
      transcript_available: false,
      progress: {
        id: 1768442,
        status: PROGRESS_STATUS.in_progress,
      },
      user_certificate: null,
    },
    {
      id: 119061,
      course_version: '1.10',
      enrollment_date: '06/16/22 - 06/16/22',
      transcript_available: true,
      progress: {
        id: 1768127,
        status: PROGRESS_STATUS.completed,
      },
      user_certificate: {
        id: 20440,
        expires_on: null,
      },
    },
  ],
};
