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
} from '@cirrus/models';

@Directive()
export abstract class LessonContentComponent implements OnInit, OnDestroy {
  private _content!: IContent;
  private _tasks: ITask[] = [];
  private _logbook: ILessonFlightLog[] = [];
  private _menuOpen!: boolean;
  private _overview!: string;
  private _lesson_title!: string;

  @Output() hidePrevAndNext = new EventEmitter<boolean>();

  @Input()
  public set content(value: IContent) {
    this._content = value;
  }

  public get content(): IContent {
    return this._content;
  }

  @Output() updateProgress = new EventEmitter<IProgress>();

  @Input()
  public get tasks(): ITask[] {
    return this._tasks;
  }

  public set tasks(value: ITask[]) {
    this._tasks = value;
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

  @Input()
  public get overview(): string {
    return this._overview;
  }

  public set overview(value: string) {
    this._overview = value;
  }

  @Input()
  public get lessonTitle(): string {
    return this._lesson_title;
  }

  public set lessonTitle(value: string) {
    this._lesson_title = value;
  }

  ngOnInit(): void {
    if (!this.overview && this.content?.progress) {
      const {
        progress: { id },
      } = this.content;

      this.updateProgress.emit({
        id,
        status: PROGRESS_STATUS.in_progress,
      });
    }
  }

  ngOnDestroy(): void {
    if (!this.overview) {
      this.updateProgress.emit({
        id: this.content.progress.id,
        status: PROGRESS_STATUS.completed,
      });
    }
  }
}
