import { Component, Input } from '@angular/core';
import { IContent } from '@cirrus/models';

@Component({
  selector: 'cirrus-lesson-content-item',
  templateUrl: './lesson-content-item.component.html',
  styleUrls: ['./lesson-content-item.component.scss'],
})
export class LessonContentItemComponent {
  @Input() item: IContent | undefined;
}
