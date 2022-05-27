import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import { ButtonComponent } from '../testdialog/button.component';
import { CourseCompletionComponent } from './course-completion.component';

@Component({
  selector: 'cirrus-app-launcher',
  template: `
    <button mat-raised-button color="accent" (click)="launch()">Launch</button>
  `,
})
class LaunchDialogComponent {
  @Input() badge = '';
  @Input() course = '';
  @Input() student = '';
  constructor(private _dialog: MatDialog) {}

  launch(): void {
    this._dialog.open(CourseCompletionComponent, {
      data: {
        badge: this.badge,
        course: this.course,
        student: this.student,
      },
      panelClass: 'fullscreen-dialog',
      height: '100vh',
      width: '100%',
    });
  }
}

export default {
  title: 'CourseCompletion',
  component: LaunchDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, CompletionDialogComponent],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FlexLayoutModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<LaunchDialogComponent> = (
  args: LaunchDialogComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  badge: 'courses/images/svg/AvionicsCourse2.svg',
  student: 'John',
  course: 'Test Course',
};
