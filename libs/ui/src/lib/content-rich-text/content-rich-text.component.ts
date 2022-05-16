import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IContent, PROGRESS_STATUS } from '@cirrus/models';
import { LessonContentComponent } from '../LessonContentComponent';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';

@Component({
  selector: 'cirrus-content-rich-text',
  templateUrl: './content-rich-text.component.html',
  styleUrls: ['./content-rich-text.component.scss'],
})
export class ContentRichTextComponent
  extends LessonContentComponent
  implements OnInit
{
  private _html!: SafeResourceUrl;

  get html() {
    return this._html;
  }

  constructor(private cirrusSanitizer: CirrusSanitizerService) {
    super();
  }

  ngOnInit(): void {
    console.log('noop', this.content);

    this._html = this.cirrusSanitizer.getSafeHtml(this.content.content_html);

    this.emitStart();
  }
}
