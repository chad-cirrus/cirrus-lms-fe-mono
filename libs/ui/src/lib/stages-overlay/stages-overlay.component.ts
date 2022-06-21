import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IStage, IStageLesson, IWorkBook, ILesson } from '@cirrus/models';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';

@Component({
  selector: 'cirrus-stages-overlay',
  templateUrl: './stages-overlay.component.html',
  styleUrls: ['./stages-overlay.component.scss'],
})
export class StagesOverlayComponent {
  @ViewChild('accordion') accordion!: CdkAccordion;
  @ViewChildren('accordionItem') accordionItems!: CdkAccordionItem[];
  @Input() workbook!: IWorkBook;

  private _lessonId = 0;

  @Input()
  set lessonId(value: number) {
    this._lessonId = value;
  }

  get lessonId() {
    return this._lessonId;
  }

  @Output() navigateToLesson = new EventEmitter<any>();
  @Output() closeSideNav = new EventEmitter();

  get completeCheck() {
    return 'courses/images/svg/complete_check.svg';
  }

  get inProgress() {
    return 'courses/images/svg/in_progress.svg';
  }

  get notStarted() {
    return 'courses/images/svg/not-started.svg';
  }

  navigate(lesson: IStageLesson) {
    this.lessonId = lesson.id;
    const payload = { lesson, course: this.workbook };
    this.navigateToLesson.emit(payload);
  }

  close() {
    this.closeSideNav.emit();
  }

  findAccordianIndex() {
    let index = 0;
    this.workbook.stages.map((s: any, i: number) => {
      s.lessons.filter((l: ILesson) => {
        if (l.id === this.lessonId) {
          index = i;
        }
      });
    });
    return index;
  }

  expanded(stage: IStage): boolean {
    return stage.lessons.map(l => l.id).indexOf(this.lessonId) > -1;
  }
}
