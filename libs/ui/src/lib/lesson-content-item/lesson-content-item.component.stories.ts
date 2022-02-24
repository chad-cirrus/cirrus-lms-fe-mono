import { FlexLayoutModule } from '@angular/flex-layout';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlaylistComponent } from '../playlist/playlist.component';
import { LessonContentItemComponent } from './lesson-content-item.component';
import { testData } from '../../testing/testData';

export default {
  title: 'LessonContentItemComponent',
  component: LessonContentItemComponent,
  decorators: [
    moduleMetadata({
      declarations: [PlaylistComponent],
      imports: [FlexLayoutModule],
    }),
  ],
} as Meta<LessonContentItemComponent>;

const Template: Story<LessonContentItemComponent> = (
  args: LessonContentItemComponent
) => ({
  component: LessonContentItemComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  item: { ...testData.contents[0], estimated_time: '6:01' },
  instructorView: false,
};

export const InstructorView = Template.bind({});
InstructorView.args = {
  item: { ...testData.contents[0], estimated_time: '6:01' },
  instructorView: true,
};
