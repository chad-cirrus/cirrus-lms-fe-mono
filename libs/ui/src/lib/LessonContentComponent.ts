import { Directive, Input } from '@angular/core';
import { IContent } from '@cirrus/models';

@Directive()
export abstract class LessonContentComponent {
  private _content!: IContent;

  @Input()
  public get content(): IContent {
    return this._content;
  }

  public set content(value: IContent) {
    this._content = value;
  }
}
