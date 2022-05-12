import { Directive, Input } from '@angular/core';
import { IContent, ILessonFlightLog, Task } from '@cirrus/models';

@Directive()
export abstract class LessonContentComponent {
  private _content!: IContent;
  private _tasks: Task[] = [];
  private _logbook: ILessonFlightLog[] = [];
  private _menuOpen!: boolean;

  @Input()
  public get content(): IContent {
    return this._content;
  }

  public set content(value: IContent) {
    this._content = value;
  }

  @Input()
  public get tasks(): Task[] {
    return this._tasks;
  }

  public set tasks(value: Task[]) {
    this._tasks = value
  }

  @Input()
  public get logbook(): ILessonFlightLog[] {
    return this._logbook;
  }

  public set logbook(value: ILessonFlightLog[]) {
    this._logbook = value
  }


  @Input()
  public get menuOpen(): boolean {
    return this._menuOpen;
  }

  public set menuOpen(value: boolean) {
    this._menuOpen = value
  }



}
