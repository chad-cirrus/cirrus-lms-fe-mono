import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IContent } from '@cirrus/models';
import { LessonContentComponent } from '../LessonContentComponent';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';

@Component({
  selector: 'cirrus-content-image',
  templateUrl: './content-image.component.html',
  styleUrls: ['./content-image.component.scss'],
})
export class ContentImageComponent
  extends LessonContentComponent
  implements OnInit
{
  private _upload_image!: SafeResourceUrl;

  get upload_image() {
    return this._upload_image;
  }

  @Input()
  override set content(content: IContent) {
    super.content = content;
    this._upload_image = this.cirrusSanitizer.getSafeResourceUrl(
      content.upload_image
    );
  }

  override get content(): IContent {
    return super.content;
  }

  constructor(private cirrusSanitizer: CirrusSanitizerService) {
    super();
  }

  override ngOnInit(): void {
    this.hidePrevAndNext.emit(false);
    super.ngOnInit();
  }
}
