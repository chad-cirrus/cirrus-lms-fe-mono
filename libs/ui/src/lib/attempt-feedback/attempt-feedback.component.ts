import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attempt } from '@cirrus/models';

@Component({
  selector: 'cirrus-attempt-feedback',
  templateUrl: './attempt-feedback.component.html',
  styleUrls: ['./attempt-feedback.component.scss']
})
export class AttemptFeedbackComponent {

  @Input() attempt!: Attempt;
  @Output() emitBack = new EventEmitter();

  back() {
    this.emitBack.emit()
  }

}
