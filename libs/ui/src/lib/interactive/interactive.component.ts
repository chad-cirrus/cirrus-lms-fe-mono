import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IContent } from '@cirrus/models';
import { LessonContentComponent } from '../LessonContentComponent';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';

@Component({
  selector: 'cirrus-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss'],
})
export class InteractiveComponent
  extends LessonContentComponent
  implements OnInit
{
  private _url!: SafeResourceUrl;

  get url() {
    return this._url;
  }

  @Input()
  override set content(content: IContent) {
    super.content = content;
    this._url = this.cirrusSanitizer.getSafeResourceUrl(content.content_file);
  }

  override get content(): IContent {
    return super.content;
  }

  constructor(private cirrusSanitizer: CirrusSanitizerService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.hidePrevAndNext.emit(false);
  }
}
