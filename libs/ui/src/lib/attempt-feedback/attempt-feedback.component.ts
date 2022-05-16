import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attempt } from '@cirrus/models';

@Component({
  selector: 'cirrus-attempt-feedback',
  templateUrl: './attempt-feedback.component.html',
  styleUrls: ['./attempt-feedback.component.scss']
})
export class AttemptFeedbackComponent implements OnInit {

  @Input() attempt!: Attempt;
  @Output() emitBack = new EventEmitter();

ngOnInit(): void {
    console.log('attempt', this.attempt)

}

  back() {
    this.emitBack.emit()
  }

}
