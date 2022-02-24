import { FlexLayoutModule } from '@angular/flex-layout';
import { CONTENT_TYPE, PlayListItemStatus } from '@cirrus/models';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlaylistComponent } from './playlist.component';

export default {
  title: 'PlaylistComponent',
  component: PlaylistComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule],
    }),
  ],
} as Meta<PlaylistComponent>;

const Template: Story<PlaylistComponent> = (args: PlaylistComponent) => ({
  component: PlaylistComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  playListItem: [
    {
      id: 0,
      type: CONTENT_TYPE.vimeo,
      title: 'Review Lesson Objective',
      contentTitle: 'Primary Flight Controls',
      status: PlayListItemStatus.Completed,
      url: '377578235',
      blob_directory: '',
    },
    {
      id: 1,
      type: CONTENT_TYPE.scorm,
      title: 'Completion Standards',
      contentTitle: 'Primary Flight Controls',
      status: PlayListItemStatus.Unknown,
      url: ' ',
      blob_directory: 'aa4cce2d02ad275bb1a2IceProtectionSystemLimitations-1',
    },
    {
      id: 2,
      type: CONTENT_TYPE.vimeo,
      title: 'Preflight Planning and Preparation',
      contentTitle: 'Primary Flight Controls',
      status: PlayListItemStatus.InProgress,
      url: '377578144',
      blob_directory: '',
    },
    {
      id: 3,
      type: CONTENT_TYPE.vimeo,
      title: 'Normal Checklist Procedures',
      contentTitle: 'Primary Flight Controls',
      status: PlayListItemStatus.Unknown,
      url: '377578202',
      blob_directory: '',
    },
  ],
};
