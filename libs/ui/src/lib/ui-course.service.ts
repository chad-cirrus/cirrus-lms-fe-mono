import { Injectable } from '@angular/core';
import { CoursePreviewVideoPlayerComponent } from './course-preview-video-player/course-preview-video-player.component';
import { IContent } from '@cirrus/models';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class UiCourseService {
  constructor(private dialog: MatDialog) {}

  watchPreview(content: any) {
    this.dialog.open(CoursePreviewVideoPlayerComponent, {
      data: content,
      width: '100%',
      backdropClass: 'course-preview-video',
      panelClass: 'course-preview-video',
    });
  }
}
