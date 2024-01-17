import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cirrus-qqb-out-of-time',
  templateUrl: './qqbOutOfTime.component.html',
  styleUrls: ['./qqbOutOfTime.component.scss'],
  standalone: true,
})
export class QqbOutOfTimeComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  /** Emits an event when the button is clicked.
   * @returns void
   */
  buttonClick() {
    this.buttonClicked.emit();
  }

}
