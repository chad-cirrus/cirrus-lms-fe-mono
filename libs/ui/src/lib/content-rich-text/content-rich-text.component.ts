import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { LessonContentComponent } from '../LessonContentComponent';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';
import { ViewportScroller } from '@angular/common';

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

  constructor(
    private cirrusSanitizer: CirrusSanitizerService,
    private scroller: ViewportScroller
  ) {
    super();
  }

  override ngOnInit(): void {
    this.hidePrevAndNext.emit(false);
    super.ngOnInit();
    this._html = this.overview ? this.overview : this.content.content_html;

    this.scroller.scrollToAnchor('scroll-anchor');
  }
}
