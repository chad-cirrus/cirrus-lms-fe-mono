import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cirrus-cta-button',
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.scss'],
})
export class CtaButtonComponent {
  @Input() text = '';
  @Input() width = '160px';
  @Input() icon = '';

  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
