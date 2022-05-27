import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-button',
  template: `
    <button *ngIf="type === 'primary'" mat-raised-button color="primary">
      {{ label }}
    </button>
    <button *ngIf="type === 'secondary'" mat-stroked-button color="primary">
      {{ label }}
    </button>
  `,
  styleUrls: [],
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type: 'primary' | 'secondary' = 'primary';
}
