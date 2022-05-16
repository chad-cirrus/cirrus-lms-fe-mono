import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PROGRESS_STATUS } from '@cirrus/models';
import { LessonContentComponent } from '../LessonContentComponent';

@Component({
  selector: 'cirrus-download-content',
  templateUrl: './download-content.component.html',
  styleUrls: ['./download-content.component.scss'],
})
export class DownloadContentComponent
  extends LessonContentComponent
  implements OnDestroy
{
  completeProgress() {
    this.updateProgress.emit({
      id: this.content.progress.id,
      status: PROGRESS_STATUS.completed,
    });
  }

  ngOnDestroy(): void {
    this.updateProgress.emit({
      id: this.content.progress.id,
      status: PROGRESS_STATUS.completed,
    });
  }
}
