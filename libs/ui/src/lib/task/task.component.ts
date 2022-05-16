
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attempt, IContent, ITask } from '@cirrus/models';

@Component({
  selector: 'cirrus-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() tasks!: ITask[];
  @Input() content!: IContent;
  @Input() tablet!: boolean | null;
  @Input() mobile!: boolean | null;
  @Output() emitRow = new EventEmitter();


  handleEmitRow($event: any) {
    this.emitRow.emit($event)
  }
}
