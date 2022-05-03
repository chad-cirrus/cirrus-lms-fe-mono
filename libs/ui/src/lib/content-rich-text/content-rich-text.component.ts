import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IContent } from '@cirrus/models';
import { LessonContentComponent } from '../LessonContentComponent';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';

@Component({
  selector: 'cirrus-content-rich-text',
  templateUrl: './content-rich-text.component.html',
  styleUrls: ['./content-rich-text.component.scss'],
})
export class ContentRichTextComponent extends LessonContentComponent {
  private _html!: SafeResourceUrl;

  get html() {
    return this._html;
  }

  @Input()
  set content(content: IContent) {
    this._html = this.cirrusSanitizer.getSafeHtml(content.content_html);
  }

  constructor(private cirrusSanitizer: CirrusSanitizerService) {
    super();
  }
}
