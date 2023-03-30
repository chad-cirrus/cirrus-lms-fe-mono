import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  description: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-notification',
  template: `
    <h1>{{ data.title }}</h1>
    <p>{{ data.description }}</p>
    <app-button label="Okay"></app-button>
  `,
  styleUrls: [],
})
export class NotificationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
