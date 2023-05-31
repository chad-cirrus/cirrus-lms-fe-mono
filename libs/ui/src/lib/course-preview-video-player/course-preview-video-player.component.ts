import {
  Component,
  Inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cirrus-course-preview-video-player',
  templateUrl: './course-preview-video-player.component.html',
  styleUrls: ['./course-preview-video-player.component.scss'],
})
export class CoursePreviewVideoPlayerComponent
{

  constructor(
    public dialogRef: MatDialogRef<CoursePreviewVideoPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
  }

  closeModal() {
    console.log('hello from here');
    this.dialogRef.close();
  }
}
