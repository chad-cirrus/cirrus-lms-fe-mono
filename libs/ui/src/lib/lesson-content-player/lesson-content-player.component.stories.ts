import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IContent, ILesson, testData } from '@cirrus/models';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LessonContentPlayerMenuComponent } from '../lesson-content-player-menu/lesson-content-player-menu.component';
import { LessonContentPlayerComponent } from './lesson-content-player.component';

const lesson: ILesson = testData;
const id: number = testData.contents[0].id;

export default {
  title: 'LessonContentPlayerComponent',
  component: LessonContentPlayerComponent,
  decorators: [
    moduleMetadata({
      declarations: [LessonContentPlayerMenuComponent],
      imports: [
        MatButtonModule,
        MatDialogModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }),
  ],
} as Meta<LessonContentPlayerComponent>;

const Template: Story<LessonContentPlayerComponent> = (
  args: LessonContentPlayerComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  data: {
    id,
    lesson,
  },
};
