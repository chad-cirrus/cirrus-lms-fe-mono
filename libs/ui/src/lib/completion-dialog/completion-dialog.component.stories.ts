import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonComponent } from '../testdialog/button.component';
import { CompletionDialogComponent } from './completion-dialog.component';

@Component({
  selector: 'cirrus-app-launcher',
  template: `
    <button mat-raised-button color="accent" (click)="launch()">Launch</button>
  `,
})
class LaunchDialogComponent {
  @Input() lesson = 'hello';
  constructor(private _dialog: MatDialog) {}

  launch(): void {
    this._dialog.open(CompletionDialogComponent, {
      data: {
        lesson: this.lesson,
      },
      panelClass: 'fullscreen-dialog',
      height: '100vh',
      width: '100%',
    });
  }
}

export default {
  title: 'CompletionComponent',
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
  lesson: 'Test Lesson Title',
};
