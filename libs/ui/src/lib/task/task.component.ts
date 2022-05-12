import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attempt, IContent, Task } from '@cirrus/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cirrus-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() tasks!: Task[];
  @Input() content!: IContent;
  @Input() tablet!: boolean | null;
  @Input() mobile!: boolean | null;
  @Output() emitRow = new EventEmitter();


  handleEmitRow($event: Attempt) {
    this.emitRow.emit($event)
  }
}
