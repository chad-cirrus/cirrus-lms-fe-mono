import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './button.component';
import { NotificationComponent } from './notification.component';

@Component({
  template: `
    <button mat-raised-button color="primary" (click)="launch()">Launch</button>
  `,
})
class LaunchDialogComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() width = '';
  constructor(private _dialog: MatDialog) {}

  launch(): void {
    this._dialog.open(NotificationComponent, {
      autoFocus: false,
      width: this.width,
      data: {
        title: this.title,
        description: this.description,
      },
    });
  }
}

export default {
  title: 'Example/Dialog',
  component: LaunchDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [MatDialogModule, BrowserAnimationsModule, MatButtonModule],
    }),
  ],
} as Meta;

const Template: Story<LaunchDialogComponent> = (
  args: LaunchDialogComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut ex et tortor auctor fermentum. Curabitur tristique mauris sed mauris feugiat vestibulum. Quisque felis ex, auctor nec lobortis quis',
  width: '40vw',
};
