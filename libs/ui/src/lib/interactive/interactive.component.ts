import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IContent } from '@cirrus/models';
import { LessonContentComponent } from '../LessonContentComponent';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';

@Component({
  selector: 'cirrus-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss'],
})
export class InteractiveComponent extends LessonContentComponent {
  private _url!: SafeResourceUrl;

  get url() {
    return this._url;
  }

  @Input()
  set content(content: IContent) {
    super.content = content;
    this._url = this.cirrusSanitizer.getSafeResourceUrl(content.content_file);
  }

  get content(): IContent {
    return super.content;
  }

  constructor(private cirrusSanitizer: CirrusSanitizerService) {
    super();
  }
}
