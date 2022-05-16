
import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ITask,
  IContent,
  IProgress,
  PROGRESS_STATUS,
  ILessonFlightLog,
  Task,
} from '@cirrus/models';


@Directive()
export abstract class LessonContentComponent implements OnInit, OnDestroy {
  private _content!: IContent;
  private _tasks: ITask[] = [];
  private _logbook: ILessonFlightLog[] = [];
  private _menuOpen!: boolean;

  @Output() hidePrevAndNext = new EventEmitter<boolean>();

  @Input()
  public get content(): IContent {
    return this._content;
  }

  public set content(value: IContent) {
    this._content = value;
  }

  @Output() updateProgress = new EventEmitter<IProgress>();

  @Input()
  public get tasks(): ITask[] {
    return this._tasks;
  }

  public set tasks(value: ITask[]) {
    this._tasks = value
  }

  @Input()
  public get logbook(): ILessonFlightLog[] {
    return this._logbook;
  }

  public set logbook(value: ILessonFlightLog[]) {
    this._logbook = value;
  }

  @Input()
  public get menuOpen(): boolean {
    return this._menuOpen;
  }

  public set menuOpen(value: boolean) {
    this._menuOpen = value;
  }

  ngOnInit(): void {
    this.emitStart();
  }

  ngOnDestroy(): void {
    this.emitUpdateComplete();
  }

  emitStart() {
    const {
      progress: { id },
    } = this.content;

    this.updateProgress.emit({
      id,
      status: PROGRESS_STATUS.in_progress,
    });
  }

  emitUpdateComplete() {
    this.updateProgress.emit({
      id: this.content.progress.id,
      status: PROGRESS_STATUS.completed,
    });
  }
}
