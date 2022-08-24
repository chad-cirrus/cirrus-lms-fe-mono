import { FlexLayoutModule } from '@angular/flex-layout';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { GenericResponsiveMatTableComponent } from './generic-responsive-mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { enrollment, task } from './StoryData';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableFormatPipe } from '../table-format.pipe';

export default {
  title: 'Generic Responsive Mat Table',
  component: GenericResponsiveMatTableComponent,
  decorators: [
    moduleMetadata({
      imports: [FlexLayoutModule, MatTableModule, BrowserAnimationsModule],
      declarations: [TableFormatPipe],
    }),
  ],
} as Meta<GenericResponsiveMatTableComponent>;

const Template: Story<GenericResponsiveMatTableComponent> = (
  args: GenericResponsiveMatTableComponent
) => ({ props: args });

export const primaryEnrollment = Template.bind({});
primaryEnrollment.args = {
  data: enrollment.data,
  columns: enrollment.columns,
  displayedColumns: enrollment.displayedColumns,
};

export const primaryTask = Template.bind({});
primaryTask.args = {
  data: task.data,
  columns: task.columns,
  displayedColumns: task.displayedColumns,
};
