import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cirrus-eqb-out-of-time',
  templateUrl: './eqbOutOfTime.component.html',
  styleUrls: ['./eqbOutOfTime.component.scss'],
  standalone: true,
})
export class EqbOutOfTimeComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  /** Emits an event when the button is clicked.
   * @returns void
   */
  buttonClick() {
    this.buttonClicked.emit();
  }

}
