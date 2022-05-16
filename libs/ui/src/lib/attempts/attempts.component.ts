import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Attempt } from '@cirrus/models';




@Component({
  selector: 'cirrus-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.scss']
})


export class AttemptsComponent {

  @Input() attempts!: Attempt[]
  @Input() mobile!: boolean | null;
  @Output() emitRow = new EventEmitter();



  nav(row: Attempt, i: number){
    const payload = {event: row, index: i }
    this.emitRow.emit(payload)
  }


}
