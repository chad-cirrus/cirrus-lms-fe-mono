import { CdkAccordionItem } from '@angular/cdk/accordion';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChildren,
} from '@angular/core';
import { Attempt, IContent, ITask } from '@cirrus/models';

@Component({
  selector: 'cirrus-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @ViewChildren('accordionItem') accordionItems!: CdkAccordionItem[];
  @Input() tasks!: ITask[];
  @Input() content!: IContent;
  @Input() tablet!: boolean | null;
  @Input() mobile!: boolean | null;
  @Output() emitRow = new EventEmitter();
  currentlyOpenedIndexes: number[] = [];

  handleEmitRow($event: any) {
    this.emitRow.emit($event);
  }

  toggled(accordionItem: CdkAccordionItem) {
    const { id } = accordionItem;
    const formatAccordionId = parseInt(id.slice(id.length - 1));
    const indexOfAccordionId =
      this.currentlyOpenedIndexes.indexOf(formatAccordionId);

    indexOfAccordionId === -1
      ? this.currentlyOpenedIndexes.push(formatAccordionId)
      : (this.currentlyOpenedIndexes = this.currentlyOpenedIndexes.filter(
          i => i !== indexOfAccordionId
        ));
  }
}
