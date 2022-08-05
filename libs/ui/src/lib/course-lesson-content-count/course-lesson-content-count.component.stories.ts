import { FlexLayoutModule } from '@angular/flex-layout';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CourseLessonContentCountComponent } from './course-lesson-content-count.component';

export default {
  title: 'Course Lesson Content Count',
  component: CourseLessonContentCountComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule],
    }),
  ],
} as Meta<CourseLessonContentCountComponent>;

const Template: Story<CourseLessonContentCountComponent> = (
  args: CourseLessonContentCountComponent
) => ({ props: args });

export const Primary = Template.bind({});
Primary.args = {
  contentCounts: {
    videos: 4,
    documents: 3,
    quizzes: 1,
    assessments: 1,
  },
};
