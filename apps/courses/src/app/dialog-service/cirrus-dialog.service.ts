import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IVideoMediaItem } from '@cirrus/models';
import { MediaContentDialogComponent } from './media-content-dialog/media-content-dialog.component';

@Injectable()
export class CoursesDialogService {
  constructor(private dialog: MatDialog) {}

  displayMediaContent(videoMediatItem: IVideoMediaItem) {
    return this.dialog.open(MediaContentDialogComponent, {
      data: {
        ...videoMediatItem,
      },
    });
  }
}
